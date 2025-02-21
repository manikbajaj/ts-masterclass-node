import { ITask } from "./../task.interface";
import { injectable, inject } from "inversify";
import { TaskService } from "../task.service";
import { ITaskPagination } from "../interfaces/taskPagination.interface";

@injectable()
export class GetTasksProvider {
  constructor(@inject(TaskService) private taskService: TaskService) {}

  public async findAllTasks(
    pagination: Partial<ITaskPagination>
  ): Promise<ITask[]> {
    const tasks: ITask[] = await this.taskService.findAll({
      limit: pagination.limit ?? 10,
      page: pagination.page ?? 1,
      order: pagination.order ?? "asc",
    });
    return tasks;
  }
}
