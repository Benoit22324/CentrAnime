import { sanitizeAnime } from "../../api/utility";
import GetAnimesByPageUseCase from "../../application/usecases/GetAnimesByPageUseCase";
import Anime from "../../domain/entities/Anime";
import InMemoryAnimeRepository from "../../infrastructure/repositories/InMemoryAnimeRepository"
import InMemoryApiAniListRepository from "../../infrastructure/repositories/InMemoryApiAniListRepository";

const anime = sanitizeAnime({
        id: "2",
        main_title: "Anime 2",
        en_title: "Anime 2 EN",
        type: "ONA",
        episodes: 11,
        status: "RELEASING",
        posterUrl: "anime2.webp",
        startDate: "03/09/2026",
        endDate: "27/12/2026",
        popularity: 119530,
        synopsis: "Synopsis de l'anime 2",
        updatedAt: new Date("09-01-2026"),
        rankId: "rank_anime_2",
        scoreId: "score_anime_2",
        animeGenres: [
            {
                genre: {
                    genreName: "Comedy"
                }
            },
            {
                genre: {
                    genreName: "Romance"
                }
            }
        ]
    } as any)

describe("GetAnimesByPageUseCase", () => {
    let apiRepository: InMemoryApiAniListRepository;
    let repository: InMemoryAnimeRepository;
    let usecase: GetAnimesByPageUseCase;

    beforeEach(() => {
        apiRepository = new InMemoryApiAniListRepository();
        repository = new InMemoryAnimeRepository();
        usecase = new GetAnimesByPageUseCase(repository, apiRepository);
    })

    it("should return a value of 1 anime in an array & 1 total", async () => {
        const res = await usecase.execute(0, 10, "Anime 2 EN", "Comedy");

        expect(res.animes).toBeDefined();
        expect(res.animes[0]).toEqual(anime);
        expect(res.total).toBe(1);
    })

    it("should return a default value of empty animes array & 0 total", async () => {
        const res = await usecase.execute(1, 10, "123456", null);

        expect(res.animes).toEqual([]);
        expect(res.total).toBe(0);
    })

    it("should return a array of values & total of pages", async () => {
        const res = await usecase.execute(0, 10, null, null);

        expect(res.animes).toBeDefined();
        expect(res.animes.length).toBe(2);
        expect(res.total).toBeDefined();
    })

    it("should return a array of values type of Anime entity & total of pages type number", async () => {
        const res = await usecase.execute(0, 10, null, null);

        expect(res.animes[0] instanceof Anime).toBeTruthy();
        expect(typeof res.total === "number").toBeTruthy();
    })
})