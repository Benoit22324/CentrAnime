import RegisterUseCase from "../../application/usecases/RegisterUseCase";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository";

describe("RegisterUseCase", () => {
    let repository: InMemoryUserRepository;
    let usecase: RegisterUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        usecase = new RegisterUseCase(repository);
    })

    it("should throw an error 'Le nom d'utilisateur est requis' with empty username", async () => {
        await expect(usecase.execute("", "user90@gmail.com", "abc")).rejects.toThrow("Le nom d'utilisateur est requis");
    })

    it("should throw an error 'L'e-mail est requis' with empty email", async () => {
        await expect(usecase.execute("GoodFan", "", "abc")).rejects.toThrow("L'e-mail est requis");
    })

    it("should throw an error 'Le mot de passe est requis' with empty password", async () => {
        await expect(usecase.execute("GoodFan", "user90@gmail.com", "")).rejects.toThrow("Le mot de passe est requis");
    })

    it("should throw an error 'L'e-mail est déjà utilisé' with wrong email and password", async () => {
        await expect(usecase.execute("GoodFan", "user1@gmail.com", "anime")).rejects.toThrow("L'e-mail est déjà utilisé");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("GoodFan", "user90@gmail.com", "abc")).resolves.not.toThrow();
    })
})