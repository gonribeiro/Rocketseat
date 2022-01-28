import { Statement } from "../entities/Statement";

export class BalanceMap {
  static toDTO({statement, balance}: { statement: Statement[], balance: number}) {
    const parsedStatement = statement.map(({
      id,
      amount,
      description,
      type,
      sender,
      created_at,
      updated_at
    }) => (
      sender ?
      {
        id,
        amount: Number(amount),
        description,
        type,
        created_at,
        updated_at,
        sender: {
          id: sender.id,
          name: sender.name,
          email: sender.email,
        }
      } :
      {
        id,
        amount: Number(amount),
        description,
        type,
        created_at,
        updated_at,
      }
    ));

    return {
      statement: parsedStatement,
      balance: Number(balance)
    }
  }
}
