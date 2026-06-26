import { prisma } from "../../shared/infra/prisma/index";
import type { IContractsRepository } from "../domain/contracts.interface.repository";
import type { CreateContractRequest } from "../domain/contracts.dto.request";
import type { Contract } from "@prisma/client";

export class ContractsRepository implements IContractsRepository {
  async create(data: CreateContractRequest): Promise<Contract> {
    const contract = await prisma.contract.create({
      data: {
        title: data.title,
        data: data.data as any,
        companyId: data.companyId,
        templateId: data.templateId,
      },
    });

    return contract;
  }

  async findByCompanyId(companyId: string): Promise<Contract[]> {
    return prisma.contract.findMany({
      where: { companyId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string): Promise<Contract | null> {
    return prisma.contract.findUnique({
      where: { id },
    });
  }

  async findByIdAndCompanyId(id: string, companyId: string): Promise<Contract | null> {
    return prisma.contract.findFirst({
      where: { id, companyId },
      include: {
        template: {
          include: {
            fields: true,
          }
        }
      }
    });
  }

  async updateStatus(id: string, status: any): Promise<Contract> {
    return prisma.contract.update({
      where: { id },
      data: { status },
    });
  }
}
