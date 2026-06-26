import { Router } from "express";
import { usersRoutes } from "../../../users/infra/users.routes";

export const routes: Router = Router();

routes.use("/users", usersRoutes);
