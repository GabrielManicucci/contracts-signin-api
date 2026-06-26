import type { IContractsRepository } from "../../../contracts/domain/contracts.interface.repository";
import { AppError } from "../../../shared/errors/AppError";

export class SignContractUseCase {
  constructor(private contractsRepository: IContractsRepository) {}

  async execute(contractId: string): Promise<void> {
    const contract = await this.contractsRepository.findById(contractId);

    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    if (contract.status !== "WAITING_FOR_SIGNATURE") {
      throw new AppError("Contract is not waiting for signature", 400);
    }

    await this.contractsRepository.updateStatus(contractId, "SIGNED");
  }
}
