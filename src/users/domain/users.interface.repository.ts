import type { User } from "@prisma/client";

export interface ICreateUserDTO {
  name: string;
  email: string;
  passwordHash: string;
  companyId?: string;
}

export interface IUpdateUserDTO {
  id: string;
  name?: string;
  email?: string;
  passwordHash?: string;
  companyId?: string;
}

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  update(data: IUpdateUserDTO): Promise<User>;
}
