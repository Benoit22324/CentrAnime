import { Opinion as PrismaOpinion } from "@prisma/client";
import { sanitizeOpinion } from "../../api/utility";
import GetViewOpinionsUseCase from "../../application/usecases/GetViewOpinionsUseCase";
import Opinion from "../../domain/entities/Opinion";
import InMemoryOpinionRepository from "../../infrastructure/repositories/InMemoryOpinionRepository";

const opGenre = sanitizeOpinion({
    id: "opinion1",
    note: 0,
    comment: "",
    viewStatus: "En cours",
    userId: "user1",
    animeId: "1",
    anime: {
        id: "1",
        main_title: "Anime 1",
        en_title: "Anime 1 EN",
        type: "TV",
        episodes: 12,
        status: "FINISHED",
        posterUrl: "anime1.webp",
        startDate: "01/04/2026",
        endDate: "30/06/2026",
        popularity: 163502,
        synopsis: "Synopsis de l'anime 1",
        updatedAt: new Date("09-04-2026"),
        rankId: "rank_anime_1",
        scoreId: "score_anime_1",
        animeGenres: [
            {
                genre: {
                    genreName: "Action"
                }
            },
            {
                genre: {
                    genreName: "Drama"
                }
            },
            {
                genre: {
                    genreName: "Sci-fi"
                }
            }
        ]
    }
} as PrismaOpinion)

describe("GetViewOpinionsUseCase", () => {
    let repository: InMemoryOpinionRepository;
    let usecase: GetViewOpinionsUseCase;

    beforeEach(() => {
        repository = new InMemoryOpinionRepository();
        usecase = new GetViewOpinionsUseCase(repository);
    })

    it("should return null with wrong userId", async () => {
        const res = await usecase.execute("user13");

        expect(res).toBeNull();
    })

    it("should return an array of Opinions", async () => {
        const res = await usecase.execute("user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual([opGenre]);
            expect(res.length).toBe(1);
            expect(res[0]).toBeInstanceOf(Opinion);
        }
    })
})