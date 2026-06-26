import { z } from "zod";

export const createCompanySchema = z.object({
  name: z.string().min(2),
  document: z.string().optional(),
});

export type CreateCompanyRequest = z.infer<typeof createCompanySchema> & {
  userId: string;
};
