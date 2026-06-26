import type { Request, Response } from "express";
import { z } from "zod";
import { CreateTemplateUseCase } from "../application/use_cases/create-template";
import { ListTemplatesUseCase } from "../application/use_cases/list-templates";
import { GetTemplateUseCase } from "../application/use_cases/get-template";

export class TemplatesController {
  constructor(
    private createTemplateUseCase: CreateTemplateUseCase,
    private listTemplatesUseCase: ListTemplatesUseCase,
    private getTemplateUseCase: GetTemplateUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = req.tenant!.companyId;
      const { name, category, content, fields } = req.body;

      const template = await this.createTemplateUseCase.execute({
        name,
        category,
        content,
        fields,
        companyId,
      });

      return res.status(201).json(template);
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
      const templates = await this.listTemplatesUseCase.execute(companyId);
      return res.status(200).json(templates);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = req.tenant!.companyId;
      const { id } = req.params;
      const template = await this.getTemplateUseCase.execute(id as string, companyId);
      return res.status(200).json(template);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
