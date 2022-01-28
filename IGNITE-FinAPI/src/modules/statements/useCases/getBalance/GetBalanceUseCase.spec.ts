import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { GetBalanceError } from "./GetBalanceError";
import { GetBalanceUseCase } from "./GetBalanceUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let getBalanceUseCase: GetBalanceUseCase;

describe("GetBalanceUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    getBalanceUseCase = new GetBalanceUseCase(
      inMemoryStatementsRepository,
      inMemoryUsersRepository
    );
  });

  it("should not be able to show balance an nonexistent user", async () => {
    expect(async () => {
      const user_id = "nonexistent";
      await getBalanceUseCase.execute({ user_id });
    }).rejects.toEqual(new GetBalanceError());
  });

  it("should be able to show balance an user", async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    const balanceUser = await getBalanceUseCase.execute({
      user_id,
    });

    expect(balanceUser.balance).toBe(0);
    expect(balanceUser.statement.length).toBe(0);
  });
});
