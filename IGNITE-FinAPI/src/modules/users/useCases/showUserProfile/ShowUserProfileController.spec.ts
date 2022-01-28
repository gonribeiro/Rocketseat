import request from "supertest";
import { v4 as uuidV4 } from "uuid";
import { hash } from "bcryptjs";

import { Connection, createConnection } from "typeorm";

import { app } from "../../../../app";

let connection: Connection;

describe("ShowUserProfileController", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("1234", 8);

    await connection.query(
      `INSERT INTO users(id, name, email, password)
        values('${id}', 'guilherme', 'guilherme@email.com.br', '${password}')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to return an authenticate user", async () => {
    const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "guilherme@email.com.br",
      password: "1234",
    });

    const { token } = responseToken.body;

    const response = await request(app)
      .get("/api/v1/profile")
      .set({ Authorization: `Bearer ${token}` });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body).toHaveProperty("name");
    expect(response.body).toHaveProperty("email");
  });
});
