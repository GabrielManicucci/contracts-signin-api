import { prisma } from "../../shared/infra/prisma/index";
import type { ITemplatesRepository, TemplateWithFields } from "../domain/templates.interface.repository";
import type { CreateTemplateRequest } from "../domain/templates.dto.request";

export class TemplatesRepository implements ITemplatesRepository {
  async create(data: CreateTemplateRequest): Promise<TemplateWithFields> {
    const template = await prisma.contractTemplate.create({
      data: {
        name: data.name,
        category: data.category,
        content: data.content,
        companyId: data.companyId,
        fields: {
          create: data.fields.map((field) => ({
            name: field.name,
            type: field.type,
            label: field.label,
          })),
        },
      },
      include: {
        fields: true,
      },
    });

    return template;
  }

  async findByCompanyId(companyId: string): Promise<TemplateWithFields[]> {
    return prisma.contractTemplate.findMany({
      where: { companyId },
      include: {
        fields: true,
      },
    });
  }

  async findByIdAndCompanyId(id: string, companyId: string): Promise<TemplateWithFields | null> {
    return prisma.contractTemplate.findFirst({
      where: { id, companyId },
      include: {
        fields: true,
      },
    });
  }
}
