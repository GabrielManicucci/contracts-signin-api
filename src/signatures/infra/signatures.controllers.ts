import type { Request, Response } from "express";
import { z } from "zod";
import { SendContractForSignatureUseCase } from "../application/use_cases/send-contract-for-signature";
import { SignContractUseCase } from "../application/use_cases/sign-contract";

export class SignaturesController {
  constructor(
    private sendContractForSignatureUseCase: SendContractForSignatureUseCase,
    private signContractUseCase: SignContractUseCase
  ) {}

  async send(req: Request, res: Response): Promise<Response> {
    try {
      const companyId = req.tenant!.companyId;
      const { contractId, signerEmail } = req.body;

      await this.sendContractForSignatureUseCase.execute({
        contractId,
        signerEmail,
        companyId,
      });

      return res.status(200).json({ message: "Contract sent for signature" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }

  async confirm(req: Request, res: Response): Promise<Response> {
    try {
      const { contractId } = req.params;

      await this.signContractUseCase.execute(contractId as string);

      return res.status(200).json({ message: "Contract signed successfully" });
    } catch (error: any) {
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
