import { sanitizeRecommandation } from "../../api/utility";
import GetRecommandationByPageUseCase from "../../application/usecases/GetRecommandationByPageUseCase";
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
]

const recosCombined = [
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
        _count: {
            favorites: 4,
            likes: 3
        }
    }
]

const recosLess = [
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
        _count: {
            favorites: 4,
            likes: 3
        }
    }
]

describe("GetRecommandationByPageUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: GetRecommandationByPageUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new GetRecommandationByPageUseCase(repository);
    })

    it("should return an empty array of Recommandation & total of 1", async () => {
        const res = await usecase.execute(1, 9);

        if (res) {
            expect(res).toBeDefined();
            expect(res.recommandations).toEqual([]);
            expect(res.recommandations.length).toBe(0);
            expect(res.total).toBe(1);
        }
    })

    it("should return an array of Recommandation with less info & total of 1", async () => {
        const res = await usecase.execute(0, 9);

        if (res) {
            expect(res).toBeDefined();
            expect(res.recommandations).toEqual(recosLess.map(r => sanitizeRecommandation(r)));
            expect(res.recommandations[0] instanceof Recommandation).toBeTruthy();
            expect(res.total).toBe(1);
        }
    })

    it("should return an array of Recommandation with less/all info & total of 1", async () => {
        const res = await usecase.execute(0, 9, "user2");

        if (res) {
            expect(res).toBeDefined();
            expect(res.recommandations).toEqual(recosCombined.map(r => sanitizeRecommandation(r, r.authorId === "user2")));
            expect(res.recommandations[0] instanceof Recommandation).toBeTruthy();
            expect(res.total).toBe(1);
        }
    })

    it("should return an array of Recommandation with all info & total of 1", async () => {
        const res = await usecase.execute(0, 9, "user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res.recommandations).toEqual(recosAll.map(r => sanitizeRecommandation(r, r.authorId === "user1")));
            expect(res.recommandations[0] instanceof Recommandation).toBeTruthy();
            expect(res.total).toBe(1);
        }
    })
})