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
    this.router.get("/", (req: Request, res: Response) => {
      const newTask = this.tasksController.handleGetTasks();
      res.send(newTask).json();
    });

    // Post Route
    this.router.post("/create", (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePostTasks();
      res.send(newTask).json();
    });

    // Patch Route
    this.router.patch("/update", (req: Request, res: Response) => {
      const newTask = this.tasksController.handlePatchTasks();
      res.send(newTask).json();
    });
  }
}
