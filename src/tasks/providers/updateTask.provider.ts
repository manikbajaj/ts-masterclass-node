import { injectable, inject } from "inversify";
import { TaskService } from "../task.service";
import { IPartialTaskWithId, ITask } from "../task.interface";
import { Document } from "mongoose";

@injectable()
export class UpdateTaskProvider {
  constructor(@inject(TaskService) private taskService: TaskService) {}

  public async updateTask(
    update: IPartialTaskWithId
  ): Promise<Document | never> {
    const task: (Document & ITask) | null = await this.taskService.findById(
      update._id
    );

    // Throw Error if task does not exist
    if (!task) {
      throw new Error("Task does not exist");
    }

    //  Update the task
    task.title = update.title ? update.title : task.title;
    task.description = update.description
      ? update.description
      : task.description;
    task.dueDate = update.dueDate ? update.dueDate : task.dueDate;
    task.priority = update.priority ? update.priority : task.priority;
    task.status = update.status ? update.status : task.status;

    // Save it
    return await task.save();
  }
}
