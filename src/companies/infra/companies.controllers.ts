import type { Request, Response } from "express";
import { z } from "zod";
import { CreateCompanyUseCase } from "../application/use_cases/create-company";

export class CreateCompanyController {
  constructor(private createCompanyUseCase: CreateCompanyUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { name, document } = req.body;
      const userId = req.user.id; // from ensureAuthenticated middleware

      const company = await this.createCompanyUseCase.execute({
        name,
        document,
        userId,
      });

      return res.status(201).json(company);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
