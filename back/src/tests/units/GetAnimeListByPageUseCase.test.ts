import { AniList } from "@prisma/client";
import { sanitizeAnimeList } from "../../api/utility";
import GetAnimeListByPageUseCase from "../../application/usecases/GetAnimeListByPageUseCase";
import AnimeList from "../../domain/entities/AnimeList";
import InMemoryAnimeListRepository from "../../infrastructure/repositories/InMemoryAnimeListRepository";

const al1 = sanitizeAnimeList({
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

describe("GetAnimeListByPageUseCase", () => {
    let repository: InMemoryAnimeListRepository;
    let usecase: GetAnimeListByPageUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeListRepository();
        usecase = new GetAnimeListByPageUseCase(repository);
    })

    it("should return an array anime list & total page of 2", async () => {
        const res = await usecase.execute(0, 1, "user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res.animeLists).toEqual([al1]);
            expect(res.total).toBe(2);
            expect(typeof res.total === "number").toBeTruthy();
        }
    })

    it("should return an empty array anime list & total page of 0", async () => {
        const res = await usecase.execute(1, 3, "user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res.animeLists).toEqual([]);
            expect(res.total).toBe(0);
            expect(typeof res.total === "number").toBeTruthy();
        }
    })

    it("should return null", async () => {
        const res = await usecase.execute(0, 3, "user4");

        expect(res).toBeNull();
    })

    it("should return an array anime list & total page", async () => {
        const res = await usecase.execute(0, 3, "user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res.animeLists[0] instanceof AnimeList).toBeTruthy();
            expect(res.total).toBe(1);
            expect(typeof res.total === "number").toBeTruthy();
        }
    })
})