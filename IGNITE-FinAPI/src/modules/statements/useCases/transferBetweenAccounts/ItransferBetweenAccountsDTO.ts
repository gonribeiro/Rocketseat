import { Statement } from "../../entities/Statement";

export type ITransferBetweenAccountsDTO =
Pick<
  Statement,
  'user_id' |
  'sender_id' |
  'description' |
  'amount'
>
