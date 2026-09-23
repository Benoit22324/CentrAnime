import { sanitizeAnimeList } from "../../api/utility";
import UpdateAnimeListUseCase from "../../application/usecases/UpdateAnimeListUseCase";
import AnimeList from "../../domain/entities/AnimeList";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";

const al = {
    id: "al1",
    title: "New Favorite",
    userId: "user1",
    aniListAnimes: [
        {
            id: "ala1",
            anime: {
                id: "ani1",
                main_title: "Anime 1"
            }
        },
        {
            id: "ala2",
            anime: {
                id: "ani2",
                main_title: "Anime 2"
            }
        }
    ]
}

describe("UpdateAnimeListUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: UpdateAnimeListUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new UpdateAnimeListUseCase(repository);
    })

    it("should throw an error 'Le titre est requis' with an empty title", async () => {
        await expect(usecase.execute("al1", "")).rejects.toThrow("Le titre est requis");
    })

    it("should throw an error 'Une erreur est survenue' with unknown id", async () => {
        await expect(usecase.execute("al60", "New Favorite")).rejects.toThrow("Une erreur est survenue");
    })

    it("should return an updated Anime list", async () => {
        const res = await usecase.execute("al1", "New Favorite");

        expect(res).toBeDefined();
        expect(res).toEqual(sanitizeAnimeList(al));
        expect(res).toBeInstanceOf(AnimeList);
    })
})