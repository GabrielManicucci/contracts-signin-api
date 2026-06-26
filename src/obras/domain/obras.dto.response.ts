import type { ObraStatus } from "@prisma/client";

export interface CreateObraResponse {
  id: string;
  companyId: string;
  name: string;
  status: ObraStatus;
  createdAt: Date;
  updatedAt: Date;
}
