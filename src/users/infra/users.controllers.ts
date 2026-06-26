import type { Request, Response } from "express";
import { z } from "zod";
import { SignUpUseCase } from "../application/use_cases/user-signup";
import { SignInUseCase } from "../application/use_cases/user-signin";

export class SignUpController {
  constructor(private signUpUseCase: SignUpUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { name, email, password } = req.body;

      const user = await this.signUpUseCase.execute({
        name,
        email,
        password,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}

export class SignInController {
  constructor(private signInUseCase: SignInUseCase) {}

  async execute(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const result = await this.signInUseCase.execute({
        email,
        password,
      });

      return res.status(200).json(result);
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(error.statusCode || 500).json({ error: error.message });
    }
  }
}
