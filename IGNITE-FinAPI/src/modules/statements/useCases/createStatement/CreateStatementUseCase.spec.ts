import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { CreateStatementError } from "./CreateStatementError";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let createStatementUseCase: CreateStatementUseCase;

enum OperationType {
  DEPOSIT = "deposit",
  WITHDRAW = "withdraw",
}

describe("Create Statement", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should not be able to create a new statement with an nonexistent user", async () => {
    expect(async () => {
      const user_id = "nonexistent";

      await createStatementUseCase.execute({
        user_id,
        type: OperationType.DEPOSIT,
        amount: 100,
        description: "Test",
      });
    }).rejects.toEqual(new CreateStatementError.UserNotFound());
  });

  it("should not be able to withdraw if the balance is insufficient", async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    await createStatementUseCase.execute({
      user_id,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: "Test",
    });

    await expect(
      createStatementUseCase.execute({
        user_id,
        type: OperationType.WITHDRAW,
        amount: 1001,
        description: "Test",
      })
    ).rejects.toEqual(new CreateStatementError.InsufficientFunds());
  });

  it("should be able to create a new statement", async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    const statement = await createStatementUseCase.execute({
      user_id,
      type: OperationType.DEPOSIT,
      amount: 1000,
      description: "Test",
    });

    expect(statement).toHaveProperty("id");
  });
});
