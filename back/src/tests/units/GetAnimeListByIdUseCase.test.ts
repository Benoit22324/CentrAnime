import { AniList } from "@prisma/client";
import { sanitizeAnimeList } from "../../api/utility";
import GetAnimeListByIdUseCase from "../../application/usecases/GetAnimeListByIdUseCase";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";
import AnimeList from "../../domain/entities/AnimeList";

const al = sanitizeAnimeList({
    id: "al1",
    title: "Favorite 1",
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
} as AniList)

describe("GetAnimeListByIdUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: GetAnimeListByIdUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new GetAnimeListByIdUseCase(repository);
    })

    it("should return null with all wrong", async () => {
        await expect(usecase.execute("al6", "user4")).resolves.toBeNull();
    })

    it("should return null with wrong userId", async () => {
        await expect(usecase.execute("al1", "user4")).resolves.toBeNull();
    })

    it("should return null with wrong id", async () => {
        await expect(usecase.execute("al6", "user1")).resolves.toBeNull();
    })

    it("should return anime list from id", async () => {
        const res = await usecase.execute("al1", "user1");

        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(AnimeList);
        expect(res).toEqual(al);
    })
})