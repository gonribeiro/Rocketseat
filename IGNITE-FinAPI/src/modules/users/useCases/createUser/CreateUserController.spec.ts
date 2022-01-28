import request from "supertest";
import { Connection, createConnection } from "typeorm";

import { app } from "../../../../app";

let connection: Connection;

describe("Create User", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to create a new user", async () => {
    const user = {
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    };

    const response = await request(app).post("/api/v1/users").send(user);

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({});
  });
});
