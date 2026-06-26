import { Router } from "express";
import { usersRoutes } from "../../../users/infra/users.routes";
import { companiesRoutes } from "../../../companies/infra/companies.routes";
import { templatesRoutes } from "../../../templates/infra/templates.routes";
import { contractsRoutes } from "../../../contracts/infra/contracts.routes";
import { signaturesRoutes } from "../../../signatures/infra/signatures.routes";
import { obrasRoutes } from "../../../obras/infra/obras.routes";

export const routes: Router = Router();

routes.use("/users", usersRoutes);
routes.use("/companies", companiesRoutes);
routes.use("/templates", templatesRoutes);
routes.use("/contracts", contractsRoutes);
routes.use("/signatures", signaturesRoutes);
routes.use("/obras", obrasRoutes);
