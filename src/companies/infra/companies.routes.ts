import { Router, type Request, type Response } from "express";
import { makeCreateCompanyController } from "./companies.factory";
import { ensureAuthenticated } from "../../shared/infra/middlewares/ensure-authenticated";

export const companiesRoutes: Router = Router();

companiesRoutes.use(ensureAuthenticated);

companiesRoutes.post("/", (req: Request, res: Response) => {
  return makeCreateCompanyController().execute(req, res);
});
