import type { IContractsRepository } from "../../domain/contracts.interface.repository";
import type { CreateContractResponse } from "../../domain/contracts.dto.response";

export class ListContractsUseCase {
  constructor(private contractsRepository: IContractsRepository) {}

  async execute(companyId: string): Promise<CreateContractResponse[]> {
    const contracts = await this.contractsRepository.findByCompanyId(companyId);
    return contracts;
  }
}
