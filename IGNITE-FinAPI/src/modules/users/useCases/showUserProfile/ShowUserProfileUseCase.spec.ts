import { InMemoryUsersRepository } from "@modules/users/repositories/in-memory/InMemoryUsersRepository";
import { ShowUserProfileError } from "./ShowUserProfileError";
import { ShowUserProfileUseCase } from "./ShowUserProfileUseCase";

let inMemoryUsersRepository: InMemoryUsersRepository;
let showUserProfileUseCase: ShowUserProfileUseCase;

describe("Show user profile", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    showUserProfileUseCase = new ShowUserProfileUseCase(
      inMemoryUsersRepository
    );
  });

  it("should be not be able to show an nonexistent user", async () => {
    expect(async () => {
      const user_id = "nonexistent";
      await showUserProfileUseCase.execute(user_id);
    }).rejects.toEqual(new ShowUserProfileError());
  });

  it("should be able return at information user", async () => {
    const { id: user_id } = await inMemoryUsersRepository.create({
      name: "Guilherme",
      email: "guilherme@email.com.br",
      password: "1234",
    });

    const user = await showUserProfileUseCase.execute(user_id);

    expect(user).toHaveProperty("id");
  });
});
