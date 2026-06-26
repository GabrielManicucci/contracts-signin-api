import { Router } from "express";
import { usersRoutes } from "../../../users/infra/users.routes";
import { companiesRoutes } from "../../../companies/infra/companies.routes";

export const routes: Router = Router();

routes.use("/users", usersRoutes);
routes.use("/companies", companiesRoutes);
