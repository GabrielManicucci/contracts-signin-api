import { ObrasRepository } from "./obras.repository";
import { CreateObraUseCase } from "../application/use_cases/create-obra";
import { ListObrasUseCase } from "../application/use_cases/list-obras";
import { ObrasController } from "./obras.controllers";

export const makeObrasController = () => {
  const obrasRepository = new ObrasRepository();
  const createObraUseCase = new CreateObraUseCase(obrasRepository);
  const listObrasUseCase = new ListObrasUseCase(obrasRepository);
  
  return new ObrasController(createObraUseCase, listObrasUseCase);
};
