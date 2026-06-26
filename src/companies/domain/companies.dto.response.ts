export interface CreateCompanyResponse {
  id: string;
  name: string;
  document: string | null;
  createdAt: Date;
  updatedAt: Date;
}
