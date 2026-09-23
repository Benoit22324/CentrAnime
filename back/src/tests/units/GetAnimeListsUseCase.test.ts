import GetAnimeListsUseCase from "../../application/usecases/GetAnimeListsUseCase";
import AnimeList from "../../domain/entities/AnimeList";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";

describe("GetAnimeListsUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: GetAnimeListsUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new GetAnimeListsUseCase(repository);
    })

    it("should return null with wrong userId", async () => {
        const res = await usecase.execute("user4");

        expect(res).toBeNull();
    })

    it("should return anime list from id", async () => {
        const res = await usecase.execute("user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res[0] instanceof AnimeList).toBeTruthy();
            expect(res.length).toBe(2);
        }
    })
})