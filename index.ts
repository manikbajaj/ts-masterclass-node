import "reflect-metadata";
import express, { Express, Request, Response } from "express";
import { addRoutes } from "./src/config/routes.config";
import mongoose from "mongoose";
import { responseFormatter } from "./src/middleware/responseFormatter";
import cors, { CorsOptions } from "cors";
import * as dotenv from "dotenv";

const app: Express = express();
const port = 3001;

let corsOptions: CorsOptions = {
  origin: "http://example.com",
};

dotenv.config();

app.use(cors());

// Process Incoming request body
app.use(express.json());

// Use response formatter middleware
app.use(responseFormatter);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// Adding All Routes
addRoutes(app);

async function bootstrap() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Cannot read environment variables");
    process.exit(1);
  }

  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
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
