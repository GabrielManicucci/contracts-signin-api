import type { IContractsRepository } from "../../../contracts/domain/contracts.interface.repository";
import type { IMailProvider } from "../../../shared/providers/MailProvider/IMailProvider";
import { AppError } from "../../../shared/errors/AppError";
import { sendContractForSignatureSchema, type SendContractForSignatureRequest } from "../../domain/signatures.dto.request";

export class SendContractForSignatureUseCase {
  constructor(
    private contractsRepository: IContractsRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: SendContractForSignatureRequest): Promise<void> {
    const { contractId, signerEmail, companyId } = data;
    sendContractForSignatureSchema.parse({ contractId, signerEmail });

    const contract = await this.contractsRepository.findByIdAndCompanyId(contractId, companyId);
    
    if (!contract) {
      throw new AppError("Contract not found", 404);
    }

    if (contract.status !== "DRAFT") {
      throw new AppError("Contract is not in DRAFT status", 400);
    }

    // Update status to WAITING_FOR_SIGNATURE
    await this.contractsRepository.updateStatus(contractId, "WAITING_FOR_SIGNATURE");

    // Send email
    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const signatureLink = `${frontendUrl}/assinar/${contractId}`;

    await this.mailProvider.sendMail({
      to: signerEmail,
      subject: `Assinatura pendente: ${contract.title}`,
      body: `
        <h1>Você tem um novo contrato para assinar!</h1>
        <p>Acesse o link abaixo para visualizar e assinar o contrato:</p>
        <a href="${signatureLink}">Clique aqui para assinar</a>
      `,
    });
  }
}
