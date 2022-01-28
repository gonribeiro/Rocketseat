import { hash } from "bcryptjs";
import request from "supertest";
import { Connection, createConnection } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { app } from "../../../../app";

let connection: Connection;

const id_user = uuidV4();
const id_user2 = uuidV4();
const statementId = uuidV4();

describe("TransferBetweenAccountsController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const password = await hash("1234", 8);

    await connection.query(`
    INSERT INTO users(id, name, email, password)
    VALUES ('${id_user}', 'Guilherme', 'guilherme@email.com.br', '${password}')
    `);

    await connection.query(`
    INSERT INTO users(id, name, email, password)
    VALUES ('${id_user2}', 'John doe', 'johndoe@email.com.br', '${password}')
    `);

    await connection.query(`
      INSERT INTO statements(id, user_id, description, amount, type)
      VALUES ('${statementId}', '${id_user}', 'deposit', 500, 'deposit')
    `);
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should not be able to transfer to an nonexisting user", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "guilherme@email.com.br",
      password: "1234",
    });

    const { token } = responseToken.body;

    const nonexistentUser = uuidV4();

    const response = await request(app)
      .post(`/api/v1/statements/transfer/${nonexistentUser}`)
      .send({
        description: "transfer",
        amount: 100,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual("Recipient user not found");
  });

  it("should not be able to transfer with invalid token", async () => {
    const response = await request(app)
      .post(`/api/v1/statements/transfer/${id_user2}`)
      .send({
        description: "transfer",
        amount: 100,
      })
      .set({
        Authorization: `Bearer invalid_token`,
      });

    expect(response.body.message).toEqual("JWT invalid token!");
    expect(response.status).toBe(401);
  });

  it("should be able to transfer an amount to an user", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "guilherme@email.com.br",
      password: "1234",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .post(`/api/v1/statements/transfer/${id_user2}`)
      .send({
        description: "transfer",
        amount: 100,
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
  });
});
