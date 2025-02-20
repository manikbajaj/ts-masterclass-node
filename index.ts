import "reflect-metadata";

import express, { Express, Request, Response } from "express";

import { tasksRouter } from "./src/tasks/tasks.router";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.use("/tasks", tasksRouter);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
