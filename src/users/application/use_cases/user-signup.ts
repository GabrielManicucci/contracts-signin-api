import bcrypt from "bcrypt";
import type { IUsersRepository } from "../../domain/users.interface.repository";
import { AppError } from "../../../shared/errors/AppError";
import { signUpSchema, type SignUpRequest } from "../../domain/users.dto.request";
import type { SignUpResponse } from "../../domain/users.dto.response";

export class SignUpUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: SignUpRequest): Promise<SignUpResponse> {
    const { email, name, password } = signUpSchema.parse(data);

    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new AppError("User already exists", 400);
    }

    const passwordHash = await bcrypt.hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
    });

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
