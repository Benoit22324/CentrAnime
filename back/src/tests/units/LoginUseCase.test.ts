import LoginUseCase from "../../application/usecases/LoginUseCase";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository";

const u = {
    id: "user1",
    username: "AnimeFan",
    email: "user1@gmail.com",
    createdAt: new Date("09-22-2026"),
    lastLogin: new Date("09-22-2026")
}

describe("LoginUseCase", () => {
    let repository: InMemoryUserRepository;
    let usecase: LoginUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        usecase = new LoginUseCase(repository);
    })

    it("should throw an error 'L'email est requis' with empty email", async () => {
        await expect(usecase.execute("", "abc")).rejects.toThrow("L'email est requis");
    })

    it("should throw an error 'Le mot de passe est requis' with empty password", async () => {
        await expect(usecase.execute("user1@gmail.com", "")).rejects.toThrow("Le mot de passe est requis");
    })

    it("should throw an error 'Identifiants invalide' with wrong email and password", async () => {
        await expect(usecase.execute("user90@gmail.com", "anime")).rejects.toThrow("Identifiants invalide");
    })

    it("should throw an error 'Identifiants invalide' with wrong email", async () => {
        await expect(usecase.execute("user90@gmail.com", "abc")).rejects.toThrow("Identifiants invalide");
    })

    it("should throw an error 'Identifiants invalide' with wrong password", async () => {
        await expect(usecase.execute("user1@gmail.com", "anime")).rejects.toThrow("Identifiants invalide");
    })

    it("should return User payload", async () => {
        const res = await usecase.execute("user1@gmail.com", "abc");

        expect(res).toBeDefined();
        expect(res).toEqual(u);
    })
})