import type { ITemplatesRepository } from "../../domain/templates.interface.repository";
import type { CreateTemplateResponse } from "../../domain/templates.dto.response";
import { AppError } from "../../../shared/errors/AppError";

export class GetTemplateUseCase {
  constructor(private templatesRepository: ITemplatesRepository) {}

  async execute(id: string, companyId: string): Promise<CreateTemplateResponse> {
    const template = await this.templatesRepository.findByIdAndCompanyId(id, companyId);
    
    if (!template) {
      throw new AppError("Template not found", 404);
    }

    return template;
  }
}
