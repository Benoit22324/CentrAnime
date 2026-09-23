import RemoveLikeRecommandationUseCase from "../../application/usecases/RemoveLikeRecommandationUseCase";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

describe("RemoveLikeRecommandationUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: RemoveLikeRecommandationUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new RemoveLikeRecommandationUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with unknown id", async () => {
        await expect(usecase.execute("like2")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("like3")).resolves.not.toThrow();
    })
})