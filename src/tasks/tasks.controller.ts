import { injectable, inject } from "inversify";
import { UserController } from "../user/user.controller";

@injectable()
export class TasksController {
  constructor(@inject(UserController) private userController: UserController) {}

  public handleGetTasks() {
    return [
      {
        title: "This is a title",
        description: "Task description",
      },
    ];
  }

  public handlePostTasks() {
    console.log(this.userController.getUser());
    return {
      title: "This is a title",
      description: "Task description",
    };
  }

  public handlePatchTasks() {
    return {
      title: "This is a title",
      description: "Task description",
    };
  }
}
