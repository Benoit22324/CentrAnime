import { sanitizeRecommandation } from "../../api/utility";
import GetRecommandationsUseCase from "../../application/usecases/GetRecommandationsUseCase";
import Recommandation from "../../domain/entities/Recommandation";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

const recosAll = [
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
        },
        favorites: [
            {
                id: "fav1"
            }
        ],
        likes: [
            {
                id: "like1"
            }
        ],
        _count: {
            favorites: 3,
            likes: 2
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
        },
        favorites: [
            {
                id: "fav2"
            }
        ],
        likes: [
            {
                id: "like3"
            }
        ],
        _count: {
            favorites: 4,
            likes: 3
        }
    }
].map(r => sanitizeRecommandation(r, r.authorId === "user2"))

describe("GetRecommandationsUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: GetRecommandationsUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new GetRecommandationsUseCase(repository);
    })

    it("should return null with wrong userId", async () => {
        const res = await usecase.execute("user6");

        expect(res).toBeNull();
    })

    it("should return an array of Recommandations", async () => {
        const res = await usecase.execute("user2");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual(recosAll);
            expect(res[0] instanceof Recommandation).toBeTruthy();
        }
    })
})