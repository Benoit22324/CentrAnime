import DeleteUserUseCase from "../../application/usecases/DeleteUserUseCase";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository";

describe("DeleteUserUseCase", () => {
    let repository: InMemoryUserRepository;
    let usecase: DeleteUserUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        usecase = new DeleteUserUseCase(repository);
    })

    it("should throw an error 'Identifiants invalide'", async () => {
        await expect(usecase.execute("user53")).rejects.toThrow("Identifiants invalide");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("user1")).resolves.not.toThrow();
    })
})