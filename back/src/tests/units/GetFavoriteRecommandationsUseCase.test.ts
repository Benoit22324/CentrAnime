import { Recommandation as PrismaRecommandation } from "@prisma/client";
import { sanitizeRecommandation } from "../../api/utility";
import GetFavoriteRecommandationsUseCase from "../../application/usecases/GetFavoriteRecommandationsUseCase";
import Recommandation from "../../domain/entities/Recommandation";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

const recos = [
    {
        id: "reco1",
        title: "Isekai de saison",
        description: "Voici des isekais",
        recommandationAnimes: [
            {
                id: "ra1",
                anime: {
                    id: "1",
                    main_title: "Anime 1"
                }
            },
            {
                id: "ra2",
                anime: {
                    id: "2",
                    main_title: "Anime 2"
                }
            }
        ],
        authorId: "user2",
        author: {
            username: "GoodAnime"
        }
    },
    {
        id: "reco2",
        title: "Fantasy de saison",
        description: "Voici des animes fantasy",
        recommandationAnimes: [
            {
                id: "ra3",
                anime: {
                    id: "3",
                    main_title: "Anime 3"
                }
            }
        ],
        authorId: "user2",
        author: {
            username: "GoodAnime"
        }
    }
].map(r => sanitizeRecommandation(r));

const reco = sanitizeRecommandation({
    id: "reco1",
    title: "Isekai de saison",
    description: "Voici des isekais",
    recommandationAnimes: [
        {
            id: "ra1",
            anime: {
                id: "1",
                main_title: "Anime 1"
            }
        },
        {
            id: "ra2",
            anime: {
                id: "2",
                main_title: "Anime 2"
            }
        }
    ],
    authorId: "user2",
    author: {
        username: "GoodAnime"
    }
} as PrismaRecommandation, true)

describe("GetFavoriteRecommandationsUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: GetFavoriteRecommandationsUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new GetFavoriteRecommandationsUseCase(repository);
    })

    it("should return an empty array", async () => {
        const res = await usecase.execute("user3");

        expect(res).toBeDefined();
        expect(res).toEqual([]);
    })

    it("should return an array of recommandations and length of 1", async () => {
        const res = await usecase.execute("user2");

        expect(res).toBeDefined();
        expect(res.length).toBe(1);
        expect(res).toEqual([reco]);
        expect(res[0] instanceof Recommandation).toBeTruthy();
    })

    it("should return an array of recommandations and length of 2", async () => {
        const res = await usecase.execute("user1");

        expect(res).toBeDefined();
        expect(res.length).toBe(2);
        expect(res).toEqual(recos);
        expect(res[0] instanceof Recommandation).toBeTruthy();
    })
})