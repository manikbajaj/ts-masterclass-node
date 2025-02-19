import { User } from "./user";
import { inject } from "inversify";
import { injectable } from "inversify";

@injectable()
export class Page {
  constructor(@inject(User) private user: User) {
    console.log(user);
  }

  createPage(url: string) {
    return {
      pageUrl: url,
    };
  }
}
