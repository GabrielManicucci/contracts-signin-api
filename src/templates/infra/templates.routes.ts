import { Router, type Request, type Response } from "express";
import { makeTemplatesController } from "./templates.factory";
import { ensureAuthenticated } from "../../shared/infra/middlewares/ensure-authenticated";
import { ensureTenant } from "../../shared/infra/middlewares/ensure-tenant";

export const templatesRoutes: Router = Router();

templatesRoutes.use(ensureAuthenticated);
templatesRoutes.use(ensureTenant);

templatesRoutes.post("/", (req: Request, res: Response) => {
  return makeTemplatesController().create(req, res);
});

templatesRoutes.get("/", (req: Request, res: Response) => {
  return makeTemplatesController().list(req, res);
});

templatesRoutes.get("/:id", (req: Request, res: Response) => {
  return makeTemplatesController().get(req, res);
});
