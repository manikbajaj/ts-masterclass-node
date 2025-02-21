import { Container } from "inversify";
import { GetTasksProvider } from "../tasks/providers/getTasks.provider";
import { TaskService } from "../tasks/task.service";
import { TasksController } from "../tasks/tasks.controller";
import { TasksRouter } from "../tasks/tasks.router";
import { UpdateTaskProvider } from "../tasks/providers/updateTask.provider";
import { UserController } from "../user/user.controller";

export const container: Container = new Container();
/* Tasks */
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
container.bind(TaskService).toSelf().inSingletonScope();
container.bind(UpdateTaskProvider).toSelf().inSingletonScope();
container.bind(GetTasksProvider).toSelf().inSingletonScope();
/* Users */
container.bind(UserController).toSelf().inTransientScope();
