import { Container } from "inversify";
import { TaskService } from "../tasks/task.service";
import { TasksController } from "../tasks/tasks.controller";
import { TasksRouter } from "../tasks/tasks.router";
import { UserController } from "../user/user.controller";

export const container: Container = new Container();
/* Tasks */
container.bind(TasksController).toSelf().inTransientScope();
container.bind(TasksRouter).toSelf().inTransientScope();
container.bind(TaskService).toSelf().inTransientScope();
/* Users */
container.bind(UserController).toSelf().inTransientScope();
