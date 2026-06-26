import type { Obra } from "@prisma/client";
import type { CreateObraRequest } from "./obras.dto.request";

export interface IObrasRepository {
  create(data: CreateObraRequest): Promise<Obra>;
  findByCompanyId(companyId: string): Promise<Obra[]>;
  findByIdAndCompanyId(id: string, companyId: string): Promise<Obra | null>;
}
