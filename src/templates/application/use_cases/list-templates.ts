import type { ITemplatesRepository } from "../../domain/templates.interface.repository";
import type { CreateTemplateResponse } from "../../domain/templates.dto.response";

export class ListTemplatesUseCase {
  constructor(private templatesRepository: ITemplatesRepository) {}

  async execute(companyId: string): Promise<CreateTemplateResponse[]> {
    const templates = await this.templatesRepository.findByCompanyId(companyId);
    return templates;
  }
}
