import { Router, type Request, type Response } from "express";
import { makeSignaturesController } from "./signatures.factory";
import { ensureAuthenticated } from "../../shared/infra/middlewares/ensure-authenticated";
import { ensureTenant } from "../../shared/infra/middlewares/ensure-tenant";

export const signaturesRoutes: Router = Router();

signaturesRoutes.post(
  "/send",
  ensureAuthenticated,
  ensureTenant,
  (req: Request, res: Response) => {
    return makeSignaturesController().send(req, res);
  },
);

signaturesRoutes.post("/confirm/:contractId", (req: Request, res: Response) => {
  return makeSignaturesController().confirm(req, res);
});
