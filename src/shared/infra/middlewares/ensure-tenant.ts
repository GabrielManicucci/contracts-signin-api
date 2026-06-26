import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import { UsersRepository } from "../../../users/infra/users.repository";

export async function ensureTenant(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (!req.user || !req.user.id) {
    throw new AppError("User not authenticated", 401);
  }

  const usersRepository = new UsersRepository();
  const user = await usersRepository.findById(req.user.id);

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!user.companyId) {
    throw new AppError("User does not belong to any tenant/company", 403);
  }

  req.tenant = {
    companyId: user.companyId,
  };

  return next();
}
