export interface TemplateFieldResponse {
  id: string;
  name: string;
  type: string;
  label: string;
}

export interface CreateTemplateResponse {
  id: string;
  name: string;
  category: string;
  content: string;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  fields: TemplateFieldResponse[];
}
