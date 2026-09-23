import { AniList } from "@prisma/client";
import { sanitizeAnimeList } from "../../api/utility";
import AnimeListAddAnimeUseCase from "../../application/usecases/AnimeListAddAnimeUseCase";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";

const newAL = sanitizeAnimeList({
    id: "al2",
    title: "Most Favorite",
    userId: "user1",
    aniListAnimes: [
        {
            id: "ala3",
            anime: {
                id: "ani1",
                main_title: "Anime 1"
            }
        },
        {
            id: "ala4",
            anime: {
                id: "ani3",
                main_title: "Anime 3"
            }
        }
    ]
} as AniList)

describe("AddMessageUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: AnimeListAddAnimeUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new AnimeListAddAnimeUseCase(repository);
    })

    it("should return null", async () => {
        const result = await usecase.execute("al5", "ani3")

        expect(result).toBeNull();
    })

    it("should return updated Anime List", async () => {
        const result = await usecase.execute("al2", "ani3")

        expect(result).toBeDefined();
        expect(result).toEqual(newAL);
    })
})