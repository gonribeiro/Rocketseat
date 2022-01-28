import { AppError } from "../../../../shared/errors/AppError";

export namespace TransferBetweenAccountsError {
  export class SenderNotFound extends AppError {
    constructor() {
      super("Sender user not found", 404);
    }
  }

  export class RecipientNotFound extends AppError {
    constructor() {
      super("Recipient user not found", 404);
    }
  }

  export class InsufficientFunds extends AppError {
    constructor() {
      super("Insufficient funds for a transfer", 400);
    }
  }
}
