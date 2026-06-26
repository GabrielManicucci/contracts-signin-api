import { z } from "zod";

export const sendContractForSignatureSchema = z.object({
  contractId: z.string().uuid(),
  signerEmail: z.string().email(),
});

export type SendContractForSignatureRequest = z.infer<typeof sendContractForSignatureSchema> & {
  companyId: string;
};
