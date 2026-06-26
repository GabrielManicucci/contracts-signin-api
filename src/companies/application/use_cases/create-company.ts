import type { ICompaniesRepository } from "../../domain/companies.interface.repository";
import type { IUsersRepository } from "../../../users/domain/users.interface.repository";
import { AppError } from "../../../shared/errors/AppError";
import { createCompanySchema, type CreateCompanyRequest } from "../../domain/companies.dto.request";
import type { CreateCompanyResponse } from "../../domain/companies.dto.response";

export class CreateCompanyUseCase {
  constructor(
    private companiesRepository: ICompaniesRepository,
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: CreateCompanyRequest): Promise<CreateCompanyResponse> {
    const { name, document, userId } = data;

    createCompanySchema.parse({ name, document });

    const user = await this.usersRepository.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (user.companyId) {
      throw new AppError("User already belongs to a company", 400);
    }

    const company = await this.companiesRepository.create({
      name,
      document,
    });

    await this.usersRepository.update({
      id: userId,
      companyId: company.id,
    });

    return company;
  }
}
