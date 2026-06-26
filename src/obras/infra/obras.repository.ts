import { prisma } from "../../shared/infra/prisma/index";
import type { IObrasRepository } from "../domain/obras.interface.repository";
import type { CreateObraRequest } from "../domain/obras.dto.request";
import type { Obra } from "@prisma/client";

export class ObrasRepository implements IObrasRepository {
  async create(data: CreateObraRequest): Promise<Obra> {
    const obra = await prisma.obra.create({
      data: {
        name: data.name,
        companyId: data.companyId,
        status: data.status,
      },
    });

    return obra;
  }

  async findByCompanyId(companyId: string): Promise<Obra[]> {
    return prisma.obra.findMany({
      where: { companyId },
      include: {
        contracts: true, // Includes all contracts for this obra
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findByIdAndCompanyId(id: string, companyId: string): Promise<Obra | null> {
    return prisma.obra.findFirst({
      where: { id, companyId },
      include: {
        contracts: true,
      },
    });
  }
}
