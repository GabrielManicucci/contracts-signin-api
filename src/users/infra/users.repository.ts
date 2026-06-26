import type { User } from "@prisma/client";
import { prisma } from "../../shared/infra/prisma/index";
import type {
  ICreateUserDTO,
  IUsersRepository,
} from "../domain/users.interface.repository";

export class UsersRepository implements IUsersRepository {
  async create(data: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: data.passwordHash,
        companyId: data.companyId,
      },
    });
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }
}
