import { TemplatesRepository } from "./templates.repository";
import { CreateTemplateUseCase } from "../application/use_cases/create-template";
import { ListTemplatesUseCase } from "../application/use_cases/list-templates";
import { GetTemplateUseCase } from "../application/use_cases/get-template";
import { TemplatesController } from "./templates.controllers";

export const makeTemplatesController = () => {
  const templatesRepository = new TemplatesRepository();
  const createTemplateUseCase = new CreateTemplateUseCase(templatesRepository);
  const listTemplatesUseCase = new ListTemplatesUseCase(templatesRepository);
  const getTemplateUseCase = new GetTemplateUseCase(templatesRepository);
  
  return new TemplatesController(
    createTemplateUseCase,
    listTemplatesUseCase,
    getTemplateUseCase
  );
};
