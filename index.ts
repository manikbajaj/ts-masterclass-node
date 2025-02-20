import "reflect-metadata";

import express, { Express, Request, Response } from "express";

import { addRoutes } from "./src/config/routes.config";

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Adding All Routes
addRoutes(app);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
