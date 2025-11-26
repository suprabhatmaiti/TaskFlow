import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  getTask,
  updateTask,
} from "../controllers/taskController.js";

const router = express.Router();

router.post("/create-task", createTask);

router.post("/delete-task/:taskId", deleteTask);
router.post("/tasks", getAllTasks);
router.post("/get-task/:taskId", getTask);
router.post("/update-task/:taskId", updateTask);

export default router;
