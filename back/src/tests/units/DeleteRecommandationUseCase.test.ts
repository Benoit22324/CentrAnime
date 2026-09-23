import DeleteRecommandationUseCase from "../../application/usecases/DeleteRecommandationUseCase";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

describe("DeleteRecommandationUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: DeleteRecommandationUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new DeleteRecommandationUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with all wrong", async () => {
        await expect(usecase.execute("reco6", "user6")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong id", async () => {
        await expect(usecase.execute("reco6", "user2")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong userId", async () => {
        await expect(usecase.execute("reco1", "user6")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("reco1", "user2")).resolves.not.toThrow();
    })
})