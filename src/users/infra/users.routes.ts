import { Router, type Request, type Response } from "express";
import { makeSignUpController, makeSignInController } from "./users.factory";

export const usersRoutes: Router = Router();

usersRoutes.post("/signup", (req: Request, res: Response) => {
  return makeSignUpController().execute(req, res);
});

usersRoutes.post("/signin", (req: Request, res: Response) => {
  return makeSignInController().execute(req, res);
});
