import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;

describe("AuthenticateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to authenticate an user", async () => {
    await createUserUseCase.execute({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    const result = await authenticateUserUseCase.execute({
      email: "guilherme@email.com.br",
      password: "1234",
    });

    expect(result).toHaveProperty("token");
  });

  it("should not be able to authenticate an nonexistent user", () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: "nonexistent@email.com.br",
        password: "1234",
      });
    }).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });

  it("should be not to authenticate with incorrect password", () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "Guilherme",
        email: "guilherme@email.com.br",
        password: "1234",
      });

      await authenticateUserUseCase.execute({
        email: user.email,
        password: "incorrectPassword",
      });
    }).rejects.toEqual(new IncorrectEmailOrPasswordError());
  });
});
