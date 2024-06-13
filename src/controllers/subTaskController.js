const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");

const addSubtask = asyncHandler(async (req, res) => {
  try {
    const { userId, taskId } = req.params;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    const newSubtask = {
      subject: req.body.subject,
      deadline: req.body.deadline,
      status: req.body.status,
    };

    task.subtasks.push(newSubtask);
    await user.save();

    const addedSubtask = task.subtasks[task.subtasks.length - 1];
    res.status(201).json(addedSubtask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// List all subtasks for a task, excluding deleted ones
const listSubtasks = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = user.tasks.id(req.params.taskId);
    console.log(task);
    if (!task || task.deleted == false) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted" });
    }

    const subtasks = task.subtasks.filter((subtask) => !subtask.deleted);
    res.json({ data: subtasks });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const updateSubtasks = asyncHandler(async (req, res) => {
  const { userId, taskId } = req.params;
  const updatedSubtasks = req.body;

  try {
    // Find user by ID
    const user = await User.findById(userId); 
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Find task by ID within user's tasks
    const task = user.tasks.id(taskId);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }

    updatedSubtasks.forEach((updatedSubtask) => {
      const existingSubtaskIndex = task.subtasks.findIndex((subtask) =>
        subtask._id.equals(updatedSubtask._id)
      );

      if (existingSubtaskIndex !== -1) {
        // Update existing subtask
        task.subtasks[existingSubtaskIndex] = updatedSubtask;
      } else {
        task.subtasks.push(updatedSubtask);
      }
    });

    await user.save();

    res.json(task.subtasks);
  } catch (error) {
    console.error("Error updating subtasks:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  addSubtask,
  listSubtasks,
  updateSubtasks,
};
