import "reflect-metadata";

import express, { Express, Request, Response } from "express";

import { TasksController } from "./src/tasks/tasks.controller";
import { container } from "./src/config/container.config";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Get the task class
const task = container.get<TasksController>(TasksController);

app.post("/tasks", (req: Request, res: Response) => {
  const newTask = task.createTask();
  res.send(newTask).json();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
