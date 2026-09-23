import UpdateUserUseCase from "../../application/usecases/UpdateUserUseCase";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository";

const u = {
    id: "user1",
    username: "BigAnimeFan",
    email: "user1@gmail.com",
    createdAt: new Date("09-22-2026"),
    lastLogin: new Date("09-22-2026")
}

describe("UpdateUserUseCase", () => {
    let repository: InMemoryUserRepository;
    let usecase: UpdateUserUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        usecase = new UpdateUserUseCase(repository);
    })

    it("should throw an error 'Le pseudonyme est requis' with an empty username", async () => {
        await expect(usecase.execute("user1", "")).rejects.toThrow("Le pseudonyme est requis");
    })

    it("should throw an error 'Identifiants invalide' with invalid id", async () => {
        await expect(usecase.execute("user16", "BigAnimeFan")).rejects.toThrow("Identifiants invalide");
    })

    it("should return an updated User Payload", async () => {
        const res = await usecase.execute("user1", "BigAnimeFan");

        expect(res).toBeDefined();
        expect(res).toEqual(u);
    })
})