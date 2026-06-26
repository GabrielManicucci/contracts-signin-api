import { Router, type Request, type Response } from "express";
import { makeObrasController } from "./obras.factory";
import { ensureAuthenticated } from "../../shared/infra/middlewares/ensure-authenticated";
import { ensureTenant } from "../../shared/infra/middlewares/ensure-tenant";

export const obrasRoutes: Router = Router();

obrasRoutes.use(ensureAuthenticated);
obrasRoutes.use(ensureTenant);

obrasRoutes.post("/", (req: Request, res: Response) => {
  return makeObrasController().create(req, res);
});

obrasRoutes.get("/", (req: Request, res: Response) => {
  return makeObrasController().list(req, res);
});
