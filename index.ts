import "reflect-metadata";

import express, { Express, Request, Response } from "express";

import { addRoutes } from "./src/config/routes.config";

const mongoose = require("mongoose");

const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Adding All Routes
addRoutes(app);

async function bootstrap() {
  try {
    await mongoose.connect(
      "mongodb+srv://manik:pPWN0WSVYRg06BLS@nodejs.7rkt0.mongodb.net/",
      {
        dbName: "fullstackTasks",
      }
    );
    console.log("Connnected To MongoDB");
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
