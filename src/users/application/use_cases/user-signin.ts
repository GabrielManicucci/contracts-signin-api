import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import type { IUsersRepository } from "../../domain/users.interface.repository";
import { AppError } from "../../../shared/errors/AppError";
import { signInSchema, type SignInRequest } from "../../domain/users.dto.request";
import type { SignInResponse } from "../../domain/users.dto.response";

export class SignInUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: SignInRequest): Promise<SignInResponse> {
    const { email, password } = signInSchema.parse(data);

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect", 401);
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect", 401);
    }

    const secret = process.env.JWT_SECRET || "default_secret";
    const expiresIn = process.env.JWT_EXPIRES_IN || "1d";

    const token = jwt.sign({}, secret, {
      subject: user.id,
      expiresIn: expiresIn as any,
    });

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        companyId: user.companyId,
      },
      token,
    };
  }
}
