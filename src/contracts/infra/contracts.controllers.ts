import type { Request, Response } from "express";
import { z } from "zod";
import { CreateContractUseCase } from "../application/use_cases/create-contract";
import { ListContractsUseCase } from "../application/use_cases/list-contracts";
import { GetContractUseCase } from "../application/use_cases/get-contract";

export class ContractsController {
  constructor(
    private createContractUseCase: CreateContractUseCase,
    private listContractsUseCase: ListContractsUseCase,
    private getContractUseCase: GetContractUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = req.tenant!.companyId;
      const { templateId, title, data } = req.body;

      const contract = await this.createContractUseCase.execute({
        templateId,
        title,
        data,
        companyId,
      });

      return res.status(201).json(contract);
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
      const contracts = await this.listContractsUseCase.execute(companyId);
      return res.status(200).json(contracts);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async get(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = req.tenant!.companyId;
      const { id } = req.params;
      const contract = await this.getContractUseCase.execute(id as string, companyId);
      return res.status(200).json(contract);
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
