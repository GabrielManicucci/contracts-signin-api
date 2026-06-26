import type { Company } from "@prisma/client";

export interface ICreateCompanyDTO {
  name: string;
  document?: string | null;
}

export interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<Company>;
  findById(id: string): Promise<Company | null>;
}
