import { ContractsRepository } from "../../contracts/infra/contracts.repository";
import { ResendMailProvider } from "../../shared/providers/MailProvider/implementations/ResendMailProvider";
import { SendContractForSignatureUseCase } from "../application/use_cases/send-contract-for-signature";
import { SignContractUseCase } from "../application/use_cases/sign-contract";
import { SignaturesController } from "./signatures.controllers";

export const makeSignaturesController = () => {
  const contractsRepository = new ContractsRepository();
  const mailProvider = new ResendMailProvider();
  
  const sendContractUseCase = new SendContractForSignatureUseCase(contractsRepository, mailProvider);
  const signContractUseCase = new SignContractUseCase(contractsRepository);
  
  return new SignaturesController(sendContractUseCase, signContractUseCase);
};
