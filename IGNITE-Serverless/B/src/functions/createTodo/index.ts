import { APIGatewayProxyHandler } from "aws-lambda";
import { v4 } from "uuid";

import { document } from "../../utils/dynamodbClient";
import { CreateTodoDTO, TodoDTO } from "./dtos";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;
  const { title, deadline } = JSON.parse(event.body) as CreateTodoDTO;

  const data: TodoDTO = {
    id: v4(),
    user_id: userid,
    title,
    done: false,
    deadline: new Date(deadline).toISOString(),
  };

  await document
    .put({
      TableName: "user_todos",
      Item: { ...data },
    })
    .promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo created",
      todo: { ...data },
    }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};
