const User = require("../models/userModel");
const asyncHandler = require("../middlewares/asyncHandler");

const listTasks = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).select("tasks");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const tasks = user.tasks
      .filter((task) => !task.deleted)
      .map((task) => ({
        ...task._doc,
        subtasks: task.subtasks.filter((subtask) => !subtask.deleted),
      }));

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


const addTask = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const newTask = {
      subject: req.body.subject,
      deadline: req.body.deadline,
      status: req.body.status,
    };

    user.tasks.push(newTask);
    await user.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


const updateTask = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = user.tasks.id(req.params.taskId);
    if (!task || task.deleted) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted" });
    }

    task.subject = req.body.subject || task.subject;
    task.deadline = req.body.deadline || task.deadline;
    task.status = req.body.status || task.status;

    await user.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


const deleteTask = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = user.tasks.id(req.params.taskId);
    if (!task || task.deleted) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted" });
    }

    task.deleted = true;
    await user.save();

    res.status(204).send(); 
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
    if (!task || task.deleted) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted" });
    }

    const subtasks = task.subtasks.filter((subtask) => !subtask.deleted);
    res.json(subtasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});


const updateSubtasks = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const task = user.tasks.id(req.params.taskId);
    if (!task || task.deleted) {
      return res
        .status(404)
        .json({ error: "Task not found or already deleted" });
    }

  
    task.subtasks = [
      ...task.subtasks.filter((subtask) => subtask.deleted),
      ...req.body.subtasks,
    ];

    await user.save();
    res.json(task.subtasks);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = {
  listTasks,
  addTask,
  updateTask,
  deleteTask,
  listSubtasks,
  updateSubtasks,
};
