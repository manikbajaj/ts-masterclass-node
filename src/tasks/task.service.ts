import { ITask } from "./task.interface";
import { ITaskPagination } from "./interfaces/taskPagination.interface";
import { Model } from "mongoose";
import { Task } from "./task.schema";
import { injectable } from "inversify";

@injectable()
export class TaskService {
  private taskModel: Model<ITask> = Task;

  public async createTask(taskData: ITask) {
    return await new this.taskModel(taskData).save();
  }

  public async findById(_id: string) {
    return await this.taskModel.findById(_id);
  }

  public async findAll(pagination: ITaskPagination) {
    return await this.taskModel
      .find()
      .limit(pagination.limit)
      .skip(pagination.page)
      .sort({
        createdAt: pagination.order === "asc" ? 1 : -1,
      });
  }
}
