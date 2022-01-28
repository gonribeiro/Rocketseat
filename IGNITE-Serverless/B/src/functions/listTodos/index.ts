import { APIGatewayProxyHandler } from "aws-lambda";

import { document } from "../../utils/dynamodbClient";

export const handle: APIGatewayProxyHandler = async (event) => {
  const { userid } = event.pathParameters;

  const user = await document
    .query({
      TableName: "user_todos",
      KeyConditionExpression: "user_id = :user_id",
      ExpressionAttributeValues: {
        ":user_id": userid,
      },
    })
    .promise();

  const todos = user.Items;

  if (todos) {
    return {
      statusCode: 200,
      body: JSON.stringify(todos),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 404,
    body: JSON.stringify({
      message: "User not found",
    }),
  };
};
