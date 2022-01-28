import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { InMemoryStatementsRepository } from "@modules/statements/repositories/in-memory/InMemoryStatementsRepository";
import { TransferBetweenAccountsUseCase } from "./TransferBetweenAccountsUseCase";
import { OperationType } from "@modules/statements/entities/Statement";
import { TransferBetweenAccountsError } from "./TransferBetweenAccountsError";

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
let transferBetweenAccountsUseCase: TransferBetweenAccountsUseCase;

describe("TransferBetweenAccountsUseCase", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();
    transferBetweenAccountsUseCase = new TransferBetweenAccountsUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should not be able to an transfer if the sender does not exists", async () => {
    const recipient = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com.br",
      password: "1234",
    });

    await expect(
      transferBetweenAccountsUseCase.execute({
        sender_id: "nonexistent",
        user_id: String(recipient.id),
        amount: 400,
        description: "Test",
      })
    ).rejects.toEqual(new TransferBetweenAccountsError.SenderNotFound());
  });

  it("should not be able to make an transfer to nonexistent recipient", async () => {
    const sender = await inMemoryUsersRepository.create({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    await expect(
      transferBetweenAccountsUseCase.execute({
        sender_id: String(sender.id),
        user_id: "nonexistent",
        amount: 400,
        description: "Test",
      })
    ).rejects.toEqual(new TransferBetweenAccountsError.RecipientNotFound());
  });

  it("should not be able to make an transfer if if the amount is greater than the current balance ", async () => {
    const sender = await inMemoryUsersRepository.create({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    await inMemoryStatementsRepository.create({
      user_id: String(sender.id),
      description: "Deposit",
      amount: 500,
      type: OperationType.DEPOSIT,
    });

    const recipient = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com.br",
      password: "1234",
    });

    await expect(
      transferBetweenAccountsUseCase.execute({
        sender_id: String(sender.id),
        user_id: String(recipient.id),
        amount: 1000,
        description: "Test",
      })
    ).rejects.toEqual(new TransferBetweenAccountsError.InsufficientFunds());
  });

  it("should be able to make an transfer between accounts", async () => {
    const sender = await inMemoryUsersRepository.create({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    await inMemoryStatementsRepository.create({
      user_id: String(sender.id),
      description: "Deposit",
      amount: 500,
      type: OperationType.DEPOSIT,
    });

    const recipient = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com.br",
      password: "1234",
    });

    const transfer = await transferBetweenAccountsUseCase.execute({
      sender_id: String(sender.id),
      user_id: String(recipient.id),
      amount: 400,
      description: "Test",
    });

    expect(transfer).toHaveProperty("id");
    expect(transfer.sender_id).toBe(sender.id);
    expect(transfer.user_id).toBe(recipient.id);
    expect(transfer.amount).toBe(400);
  });
});
