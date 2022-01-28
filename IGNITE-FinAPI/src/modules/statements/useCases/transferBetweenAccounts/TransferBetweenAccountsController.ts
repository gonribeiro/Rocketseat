import { Request, Response } from "express";
import { container } from "tsyringe";
import { TransferBetweenAccountsUseCase } from "./TransferBetweenAccountsUseCase";

export class TransferBetweenAccountsController {
  async execute(request: Request, response: Response): Promise<Response> {
    const sender_id = request.user.id

    const { user_id } = request.params

    const { description, amount } = request.body

    const transferBetweenAccountsUseCase = container.resolve(TransferBetweenAccountsUseCase)

    const transfer = await transferBetweenAccountsUseCase.execute({
      sender_id,
      user_id,
      description,
      amount
    })

    return response.json(transfer)
  }
}
