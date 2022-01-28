import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { OperationType, Statement } from "../../entities/Statement";
import { IStatementsRepository } from "../../repositories/IStatementsRepository";
import { ITransferBetweenAccountsDTO } from "./ItransferBetweenAccountsDTO";
import { TransferBetweenAccountsError } from "./TransferBetweenAccountsError";

@injectable()
export class TransferBetweenAccountsUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StatementsRepository")
    private statementsRepository: IStatementsRepository
  ) {}

  async execute({
    user_id,
    sender_id,
    description,
    amount,
  }: ITransferBetweenAccountsDTO): Promise<Statement> {
    const senderExists = await this.usersRepository.findById(sender_id);

    if (!senderExists) {
      throw new TransferBetweenAccountsError.SenderNotFound();
    }

    const recipientExists = await this.usersRepository.findById(user_id);

    if (!recipientExists) {
      throw new TransferBetweenAccountsError.RecipientNotFound();
    }

    const currentBalance = await this.statementsRepository.getUserBalance({
      user_id: sender_id,
      with_statement: false,
    });

    if (currentBalance.balance < amount) {
      throw new TransferBetweenAccountsError.InsufficientFunds();
    }

    const transfer = await this.statementsRepository.create({
      user_id,
      sender_id,
      description,
      amount,
      type: OperationType.TRANSFER,
    });

    return transfer;
  }
}
