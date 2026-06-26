import type { ContractStatus } from "@prisma/client";

export interface CreateContractResponse {
  id: string;
  companyId: string;
  templateId: string;
  title: string;
  status: ContractStatus;
  data: any;
  createdAt: Date;
  updatedAt: Date;
}
