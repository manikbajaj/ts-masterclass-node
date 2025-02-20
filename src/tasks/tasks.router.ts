import express, { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";
import { injectable, inject } from "inversify";

@injectable()
export class TasksRouter {
  public router: Router;

  constructor(
    @inject(TasksController) private tasksController: TasksController
  ) {
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    // Post Route
    this.router.post("/create", (req: Request, res: Response) => {
      const newTask = this.tasksController.createTask();
      res.send(newTask).json();
    });
  }
}
