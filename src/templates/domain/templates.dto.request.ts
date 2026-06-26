import { z } from "zod";

export const templateFieldSchema = z.object({
  name: z.string().min(1),
  type: z.string().min(1),
  label: z.string().min(1),
});

export const createTemplateSchema = z.object({
  name: z.string().min(2),
  category: z.string().min(2),
  content: z.string().min(1),
  fields: z.array(templateFieldSchema),
});

export type CreateTemplateRequest = z.infer<typeof createTemplateSchema> & {
  companyId: string;
};
