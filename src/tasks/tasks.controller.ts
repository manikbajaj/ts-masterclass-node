import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller";
import { Task } from "./task.schema";
import { IPartialTaskWithId, ITask } from "./task.interface";
import { Document } from "mongoose";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  public async handleGetTasks(req: Request, res: Response) {
    const tasks: ITask[] = await Task.find();
    return tasks;
  }

  public async handlePostTasks(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> = new Task(req.body);

    await task.save();

    return task;
  }

  public async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ) {
    const task = await Task.findById(req.body["_id"]);

    if (task) {
      //  Update the task
      task.title = req.body.title ? req.body.title : task.title;
      task.description = req.body.description
        ? req.body.description
        : task.description;
      task.dueDate = req.body.dueDate ? req.body.dueDate : task.dueDate;
      task.priority = req.body.priority ? req.body.priority : task.priority;
      task.status = req.body.status ? req.body.status : task.status;

      // Save it
      await task.save();
    }

    return task;
  }
}
