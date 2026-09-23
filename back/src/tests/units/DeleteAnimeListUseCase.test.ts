import DeleteAnimeListUseCase from "../../application/usecases/DeleteAnimeListUseCase";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";

describe("DeleteAnimeListUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: DeleteAnimeListUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new DeleteAnimeListUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with all wrong", async () => {
        await expect(usecase.execute("al5", "user7")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong id", async () => {
        await expect(usecase.execute("al5", "user1")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong userId", async () => {
        await expect(usecase.execute("al1", "user7")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("al1", "user1")).resolves.not.toThrow();
    })
})