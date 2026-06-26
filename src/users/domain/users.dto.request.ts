import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignInRequest = z.infer<typeof signInSchema>;

export const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

export type SignUpRequest = z.infer<typeof signUpSchema>;
