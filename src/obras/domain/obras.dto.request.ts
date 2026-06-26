import { z } from "zod";
import { ObraStatus } from "@prisma/client";

export const createObraSchema = z.object({
  name: z.string().min(2),
  status: z.nativeEnum(ObraStatus).optional(),
});

export type CreateObraRequest = z.infer<typeof createObraSchema> & {
  companyId: string;
};
