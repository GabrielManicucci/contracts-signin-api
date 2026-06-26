import { z } from "zod";

export const createContractSchema = z.object({
  templateId: z.string().uuid(),
  obraId: z.string().uuid().optional(),
  title: z.string().min(2),
  data: z.record(z.string(), z.any()),
  contractValue: z.string().optional(),
});

export type CreateContractRequest = z.infer<typeof createContractSchema> & {
  companyId: string;
};
