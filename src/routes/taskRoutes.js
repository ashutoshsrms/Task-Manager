const express = require("express");
const {
  listTasks,
  addTask,
  updateTask,
  deleteTask,

} = require("../controllers/taskController");
const {
  addSubtask,
  listSubtasks,
  updateSubtasks,
} = require("../controllers/subTaskController");

const router = express.Router({ mergeParams: true });

router.get("/tasks", listTasks);
router.post("/tasks", addTask);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

// subRask Routes

router.post("/tasks/:taskId/subtasks", addSubtask);
router.get("/tasks/:taskId/subtasks", listSubtasks);
router.put("/tasks/:taskId/subtasks", updateSubtasks);

module.exports = router;
