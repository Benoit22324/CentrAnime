import CreateContactRequestUseCase from "../../application/usecases/CreateContactRequestUseCase";
import InMemoryContactRepository from "../../infrastructure/repositories/InMemoryContactRepository";
import InMemoryContactRequestRepository from "../../infrastructure/repositories/InMemoryContactRequestRepository";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository";

describe("CreateContactRequestUseCase", () => {
    let contactRepository: InMemoryContactRepository;
    let contactRequestRepository: InMemoryContactRequestRepository;
    let userRepository: InMemoryUserRepository;
    let usecase: CreateContactRequestUseCase;

    beforeEach(() => {
        contactRepository = new InMemoryContactRepository();
        contactRequestRepository = new InMemoryContactRequestRepository();
        userRepository = new InMemoryUserRepository();
        usecase = new CreateContactRequestUseCase(userRepository, contactRepository, contactRequestRepository);
    })

    it("should throw an error 'Vous avez déjà envoyé/reçu une requête'", async () => {
        await expect(usecase.execute("user1", "user3@gmail.com")).rejects.toThrow("Vous avez déjà envoyé/reçu une requête");
    })

    it("should throw an error 'Vous êtes déjà en contact'", async () => {
        await expect(usecase.execute("user1", "user2@gmail.com")).rejects.toThrow("Vous êtes déjà en contact");
    })

    it("should throw an error 'L'utilisateur n'existe pas'", async () => {
        await expect(usecase.execute("user2", "user5613@gmail.com")).rejects.toThrow("L'utilisateur n'existe pas");
    })

    it("should throw an error 'L'email de la personne est requise'", async () => {
        await expect(usecase.execute("user2", " ")).rejects.toThrow("L'email de la personne est requise");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("user2", "user3@gmail.com")).resolves.not.toThrow();
    })
})