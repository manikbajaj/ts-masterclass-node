import express, { Request, Response, Router } from "express";
import { TasksController } from "./tasks.controller";
import { injectable, inject } from "inversify";
import { ITask, IPartialTaskWithId } from "./task.interface";
import { createTaskValidator } from "./validators/createTask.validator";
import { validationResult } from "express-validator";
import { getTasksValidator } from "./validators/getTasks.validator";

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
    // Get Route
    this.router.get(
      "/",
      getTasksValidator,
      async (req: Request, res: Response) => {
        const result = validationResult(req);
        console.log(result);
        console.log(req.query); // Check The Query
        const allTasks = await this.tasksController.handleGetTasks(req, res);
        res.json(allTasks);
      }
    );

    // Post Route
    this.router.post(
      "/create",
      createTaskValidator,
      async (req: Request<{}, {}, ITask>, res: Response) => {
        const result = validationResult(req);
        if (result.isEmpty()) {
          const newTask = await this.tasksController.handlePostTasks(req, res);
          res.json(newTask);
        } else {
          res.json(result.array());
        }
      }
    );

    // Patch Route
    this.router.patch(
      "/update",
      async (req: Request<{}, {}, IPartialTaskWithId>, res: Response) => {
        const updatedTask = await this.tasksController.handlePatchTasks(
          req,
          res
        );
        res.json(updatedTask);
      }
    );
  }
}
