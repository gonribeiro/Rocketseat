import { Statement } from "../entities/Statement";

type IOptionalCreateStatementInRepositoryDTO =
Pick<
  Statement,
  'sender_id'
>

export type ICreateStatementInRepositoryDTO =
Pick<
  Statement,
  'user_id' |
  'description' |
  'amount' |
  'type'
> &
Partial<IOptionalCreateStatementInRepositoryDTO>
