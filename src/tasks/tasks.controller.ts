import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller";
import { IPartialTaskWithId, ITask } from "./task.interface";
import { Document } from "mongoose";
import { TaskService } from "./task.service";
import { UpdateTaskProvider } from "./providers/updateTask.provider";
import { StatusCodes } from "http-status-codes";
import { matchedData } from "express-validator";
import { GetTasksProvider } from "./providers/getTasks.provider";

@injectable()
export class TasksController {
  constructor(
    @inject(UserController) private userController: UserController,
    @inject(TaskService) private taskService: TaskService,
    @inject(UpdateTaskProvider) private updateTaskProvider: UpdateTaskProvider,
    @inject(GetTasksProvider) private getTasksProvider: GetTasksProvider
  ) {}

  public async handleGetTasks(req: Request, res: Response): Promise<ITask[]> {
    const validatedData = matchedData(req);

    try {
      const tasks: ITask[] = await this.getTasksProvider.findAllTasks(
        validatedData
      );
      return tasks;
    } catch (error: any) {
      throw new Error(error);
    }
  }

  public async handlePostTasks(req: Request<{}, {}, ITask>, res: Response) {
    const task: Document<unknown, any, ITask> =
      await this.taskService.createTask(req.body);
    return task;
  }

  public async handlePatchTasks(
    req: Request<{}, {}, IPartialTaskWithId>,
    res: Response
  ): Promise<Document> {
    const validatedData: IPartialTaskWithId = matchedData(req);

    try {
      return await this.updateTaskProvider.updateTask(validatedData);
    } catch (error: any) {
      throw new Error(error);
    }
  }
}
