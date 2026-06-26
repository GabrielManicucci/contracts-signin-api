import type { Request, Response } from "express";
import { z } from "zod";
import { CreateObraUseCase } from "../application/use_cases/create-obra";
import { ListObrasUseCase } from "../application/use_cases/list-obras";

export class ObrasController {
  constructor(
    private createObraUseCase: CreateObraUseCase,
    private listObrasUseCase: ListObrasUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = req.tenant!.companyId;
      const { name, status } = req.body;

      const obra = await this.createObraUseCase.execute({
        name,
        status,
        companyId,
      });

      return res.status(201).json(obra);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = req.tenant!.companyId;
      const obras = await this.listObrasUseCase.execute(companyId);
      return res.status(200).json(obras);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
