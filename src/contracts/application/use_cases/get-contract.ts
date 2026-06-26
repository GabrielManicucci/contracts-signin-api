import type { IContractsRepository } from "../../domain/contracts.interface.repository";
import type { CreateContractResponse } from "../../domain/contracts.dto.response";
import { AppError } from "../../../shared/errors/AppError";

export class GetContractUseCase {
  constructor(private contractsRepository: IContractsRepository) {}

  async execute(id: string, companyId: string): Promise<CreateContractResponse> {
    const contract = await this.contractsRepository.findByIdAndCompanyId(id, companyId);
    
    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    return contract;
  }
}
