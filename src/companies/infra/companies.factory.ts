import { CompaniesRepository } from "./companies.repository";
import { UsersRepository } from "../../users/infra/users.repository";
import { CreateCompanyUseCase } from "../application/use_cases/create-company";
import { CreateCompanyController } from "./companies.controllers";

export const makeCreateCompanyController = () => {
  const companiesRepository = new CompaniesRepository();
  const usersRepository = new UsersRepository();
  const createCompanyUseCase = new CreateCompanyUseCase(companiesRepository, usersRepository);
  return new CreateCompanyController(createCompanyUseCase);
};
