import CreateRecommandationUseCase from "../../application/usecases/CreateRecommandationUseCase";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

describe("CreateRecommandationUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: CreateRecommandationUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new CreateRecommandationUseCase(repository);
    })

    it("should throw an error 'Le titre est requis", async () => {
        await expect(usecase.execute("user1", " ", "Voici des isekais")).rejects.toThrow("Le titre est requis");
    })

    it("should throw an error 'La description est requise'", async () => {
        await expect(usecase.execute("user1", "Isekai de saison", " ")).rejects.toThrow("La description est requise");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("user1", "Isekai de saison", "Voici des isekais")).resolves.not.toThrow();
    })
})