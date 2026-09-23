import CreateAnimeListUseCase from "../../application/usecases/CreateAnimeListUseCase";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";

describe("AddMessageUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: CreateAnimeListUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new CreateAnimeListUseCase(repository);
    })

    it("should throw an error 'Le titre est requis'", async () => {
        await expect(usecase.execute("user1", " ")).rejects.toThrow("Le titre est requis");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("user1", "Favorite")).resolves.not.toThrow();
    })
})