import express, { Request, Response, Router } from "express";

import { TasksController } from "./tasks.controller";
import { container } from "../config/container.config";

export const tasksRouter: Router = express.Router();

const taskController: TasksController =
  container.get<TasksController>(TasksController);

tasksRouter.post("/create", (req: Request, res: Response) => {
  const newTask = taskController.createTask();
  res.send(newTask).json();
});
