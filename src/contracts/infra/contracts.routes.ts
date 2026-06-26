import { Router, type Request, type Response } from "express";
import { makeContractsController } from "./contracts.factory";
import { ensureAuthenticated } from "../../shared/infra/middlewares/ensure-authenticated";
import { ensureTenant } from "../../shared/infra/middlewares/ensure-tenant";

export const contractsRoutes: Router = Router();

contractsRoutes.use(ensureAuthenticated);
contractsRoutes.use(ensureTenant);

contractsRoutes.post("/", (req: Request, res: Response) => {
  return makeContractsController().create(req, res);
});

contractsRoutes.get("/", (req: Request, res: Response) => {
  return makeContractsController().list(req, res);
});

contractsRoutes.get("/:id", (req: Request, res: Response) => {
  return makeContractsController().get(req, res);
});
