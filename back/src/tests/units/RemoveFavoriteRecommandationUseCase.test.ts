import RemoveFavoriteRecommandationUseCase from "../../application/usecases/RemoveFavoriteRecommandationUseCase";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

describe("RemoveFavoriteRecommandationUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: RemoveFavoriteRecommandationUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new RemoveFavoriteRecommandationUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with unknown id", async () => {
        await expect(usecase.execute("fav3")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("fav2")).resolves.not.toThrow();
    })
})