import { ContractsRepository } from "./contracts.repository";
import { CreateContractUseCase } from "../application/use_cases/create-contract";
import { ListContractsUseCase } from "../application/use_cases/list-contracts";
import { GetContractUseCase } from "../application/use_cases/get-contract";
import { ContractsController } from "./contracts.controllers";

export const makeContractsController = () => {
  const contractsRepository = new ContractsRepository();
  const createContractUseCase = new CreateContractUseCase(contractsRepository);
  const listContractsUseCase = new ListContractsUseCase(contractsRepository);
  const getContractUseCase = new GetContractUseCase(contractsRepository);
  
  return new ContractsController(
    createContractUseCase,
    listContractsUseCase,
    getContractUseCase
  );
};
