import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;

describe("CreateUserUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it("should be able to create a new user", async () => {
    const user = await createUserUseCase.execute({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });
    expect(user).toHaveProperty("id");
  });

  it("should not be able to create a new user with email already registered", async () => {
    expect(async () => {
      const user = await createUserUseCase.execute({
        name: "Guilherme",
        email: "guilherme@email.com.br",
        password: "1234",
      });

      await createUserUseCase.execute({
        name: user.name,
        email: user.email,
        password: user.password,
      });
    }).rejects.toEqual(new CreateUserError());
  });
});
