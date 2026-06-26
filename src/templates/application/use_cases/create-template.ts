import type { ITemplatesRepository } from "../../domain/templates.interface.repository";
import { createTemplateSchema, type CreateTemplateRequest } from "../../domain/templates.dto.request";
import type { CreateTemplateResponse } from "../../domain/templates.dto.response";

export class CreateTemplateUseCase {
  constructor(private templatesRepository: ITemplatesRepository) {}

  async execute(data: CreateTemplateRequest): Promise<CreateTemplateResponse> {
    const parsedData = createTemplateSchema.parse({
      name: data.name,
      category: data.category,
      content: data.content,
      fields: data.fields,
    });

    const template = await this.templatesRepository.create({
      ...parsedData,
      companyId: data.companyId,
    });

    return template;
  }
}
