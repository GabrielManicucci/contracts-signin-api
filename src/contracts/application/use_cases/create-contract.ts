import type { IContractsRepository } from "../../domain/contracts.interface.repository";
import {
  createContractSchema,
  type CreateContractRequest,
} from "../../domain/contracts.dto.request";
import type { CreateContractResponse } from "../../domain/contracts.dto.response";
import { AppError } from "../../../shared/errors/AppError";

export class CreateContractUseCase {
  constructor(private contractsRepository: IContractsRepository) {}

  async execute(data: CreateContractRequest): Promise<CreateContractResponse> {
    const parsedData = createContractSchema.parse({
      title: data.title,
      templateId: data.templateId,
      obraId: data.obraId,
      data: data.data,
    });

    const contract = await this.contractsRepository.create({
      ...parsedData,
      companyId: data.companyId,
    });

    return contract;
  }
}
