import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { z } from "zod";
import type { IUsersRepository } from "../../domain/users.interface.repository";
import { AppError } from "../../../shared/errors/AppError";

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type SignInRequest = z.infer<typeof signInSchema>;

interface SignInResponse {
  user: {
    id: string;
    name: string;
    email: string;
    companyId: string | null;
  };
  token: string;
}

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
