const express = require("express");
const {
  listTasks,
  addTask,
  updateTask,
  deleteTask,
  listSubtasks,
  updateSubtasks,
} = require("../controllers/taskController");

const router = express.Router({ mergeParams: true });

router.get("/tasks", listTasks);
router.post("/tasks", addTask);
router.put("/tasks/:taskId", updateTask);
router.delete("/tasks/:taskId", deleteTask);

router.get("/tasks/:taskId/subtasks", listSubtasks);
router.put("/tasks/:taskId/subtasks", updateSubtasks);

module.exports = router;
