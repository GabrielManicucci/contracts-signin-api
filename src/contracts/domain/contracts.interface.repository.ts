import type { Contract } from "@prisma/client";
import type { CreateContractRequest } from "./contracts.dto.request";

export interface IContractsRepository {
  create(data: CreateContractRequest): Promise<Contract>;
  findByCompanyId(companyId: string): Promise<Contract[]>;
  findByIdAndCompanyId(id: string, companyId: string): Promise<Contract | null>;
}
