import RemoveAnimeAnimeListUseCase from "../../application/usecases/RemoveAnimeAnimeListUseCase";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";

describe("RemoveAnimeAnimeListUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: RemoveAnimeAnimeListUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new RemoveAnimeAnimeListUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with unknown id", async () => {
        await expect(usecase.execute("ala6")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("ala1")).resolves.not.toThrow();
    })
})