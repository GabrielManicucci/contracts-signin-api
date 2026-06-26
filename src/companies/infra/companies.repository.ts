import type { Company } from "@prisma/client";
import { prisma } from "../../shared/infra/prisma/index";
import type { ICompaniesRepository, ICreateCompanyDTO } from "../domain/companies.interface.repository";

export class CompaniesRepository implements ICompaniesRepository {
  async create(data: ICreateCompanyDTO): Promise<Company> {
    const company = await prisma.company.create({
      data: {
        name: data.name,
        document: data.document,
      },
    });
    return company;
  }

  async findById(id: string): Promise<Company | null> {
    const company = await prisma.company.findUnique({
      where: { id },
    });
    return company;
  }
}
