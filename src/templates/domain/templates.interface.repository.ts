import type { ContractTemplate, ContractTemplateField } from "@prisma/client";
import type { CreateTemplateRequest } from "./templates.dto.request";

export type TemplateWithFields = ContractTemplate & {
  fields: ContractTemplateField[];
};

export interface ITemplatesRepository {
  create(data: CreateTemplateRequest): Promise<TemplateWithFields>;
  findByCompanyId(companyId: string): Promise<TemplateWithFields[]>;
  findByIdAndCompanyId(id: string, companyId: string): Promise<TemplateWithFields | null>;
}
