import { UsersRepository } from "./users.repository";
import { SignUpUseCase } from "../application/use_cases/user-signup";
import { SignInUseCase } from "../application/use_cases/user-signin";
import { SignUpController, SignInController } from "./users.controllers";

export const makeSignUpController = () => {
  const usersRepository = new UsersRepository();
  const signUpUseCase = new SignUpUseCase(usersRepository);
  return new SignUpController(signUpUseCase);
};

export const makeSignInController = () => {
  const usersRepository = new UsersRepository();
  const signInUseCase = new SignInUseCase(usersRepository);
  return new SignInController(signInUseCase);
};
