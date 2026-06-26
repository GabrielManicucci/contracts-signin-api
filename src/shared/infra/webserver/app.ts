import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
import cors from "cors";
import dotenv from "dotenv";
import { z } from "zod";

import { AppError } from "../../errors/AppError";
import { routes } from "./routes";

dotenv.config();

export const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    if (err instanceof z.ZodError) {
      return response.status(400).json({
        message: "Validation Error",
        issues: err.issues,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  },
);
