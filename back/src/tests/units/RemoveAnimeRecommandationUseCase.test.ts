import RemoveAnimeRecommandationUseCase from "../../application/usecases/RemoveAnimeRecommandationUseCase";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

describe("RemoveAnimeRecommandationUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: RemoveAnimeRecommandationUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new RemoveAnimeRecommandationUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with unknown id", async () => {
        await expect(usecase.execute("ra6")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("ra1")).resolves.not.toThrow();
    })
})