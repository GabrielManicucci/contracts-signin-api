import bcrypt from "bcrypt";
import { z } from "zod";
import type { IUsersRepository } from "../../domain/users.interface.repository";
import { AppError } from "../../../shared/errors/AppError";

const signUpSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpRequest = z.infer<typeof signUpSchema>;

export class SignUpUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async execute(data: SignUpRequest) {
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
