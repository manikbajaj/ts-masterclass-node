import express, { Express, Request, Response } from "express";

import { Page } from "./src/page";
import { Post } from "./src/post";
import { User } from "./src/user";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/create-post", (req: Request, res: Response) => {
  let post = new Post("New Post", "Post Content", new User("John"));
  console.log(post);
  res.send("Post Created");
});

app.get("/create-page", (req: Request, res: Response) => {
  let page = new Page("New Post", new User("John"));
  console.log(page);
  res.send("Page Created");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
