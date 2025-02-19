import "reflect-metadata";

import express, { Express, Request, Response } from "express";

import { Page } from "./src/page";
import { Post } from "./src/post";
import { User } from "./src/user";
import { container } from "./src/config/container.config";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const pageClass = container.get<Page>(Page);

app.get("/create-post", (req: Request, res: Response) => {
  let post = new Post("New Post", "Post Content", new User());
  console.log(post);
  res.send("Post Created");
});

app.get("/create-page", (req: Request, res: Response) => {
  let page = pageClass.createPage("http://mypage.com");
  console.log(page);
  res.send(page).json();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
