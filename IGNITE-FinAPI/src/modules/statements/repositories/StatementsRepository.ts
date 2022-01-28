import { getRepository, Repository } from "typeorm";
import { ICreateStatementInRepositoryDTO } from "../dtos/ICreateStatementInRepositoryDTO";

import { Statement } from "../entities/Statement";
import { IGetBalanceDTO } from "../useCases/getBalance/IGetBalanceDTO";
import { IGetStatementOperationDTO } from "../useCases/getStatementOperation/IGetStatementOperationDTO";
import { IStatementsRepository } from "./IStatementsRepository";

export class StatementsRepository implements IStatementsRepository {
  private repository: Repository<Statement>;

  constructor() {
    this.repository = getRepository(Statement);
  }

  async create({
    user_id,
    amount,
    description,
    type,
    sender_id
  }: ICreateStatementInRepositoryDTO): Promise<Statement> {
    const statement = this.repository.create({
      user_id,
      amount,
      description,
      type,
      sender_id
    });

    return this.repository.save(statement);
  }

  async findStatementOperation({ statement_id, user_id }: IGetStatementOperationDTO): Promise<Statement | undefined> {
    return this.repository.findOne({
      where: [
        {
          id: statement_id,
          user_id
        },
        {
          id: statement_id,
          sender_id: user_id
        },
      ],
    });
  }

  async getUserBalance({ user_id, with_statement = false }: IGetBalanceDTO):
    Promise<
      { balance: number } | { balance: number, statement: Statement[] }
    >
  {
    const statement = await this.repository.find({
      where: [
        { user_id },
        { sender_id: user_id }
      ],
      relations: [
        'sender'
      ]
    });

    const balance = statement.reduce((acc, operation) => {
      if (operation.type === 'deposit') {
        return acc + Number(operation.amount);
      } else if (operation.type === 'withdraw') {
        return acc - Number(operation.amount);
      } else {
        if (operation.user_id === user_id) {
          return acc + Number(operation.amount);
        } else {
          return acc - Number(operation.amount);
        }
      }
    }, 0)

    if (with_statement) {
      return {
        statement,
        balance
      }
    }

    return { balance }
  }
}
