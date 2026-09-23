import { Prisma } from "@prisma/client";
import { GetRecommandationByPageOutputs } from "../../api/dto";
import { sanitizeRecommandation } from "../../api/utility";
import Recommandation from "../../domain/entities/Recommandation";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

type PrismaRecommandationWithAll = Prisma.RecommandationGetPayload<{
    include: {
        recommandationAnimes: {
            select: {
                id: true,
                anime: {
                    select: {
                        id: true,
                        main_title: true
                    }
                }
            }
        },
        author: {
            select: {
                username: true
            }
        },
        favorites: {
            select: { id: true }
        },
        likes: {
            select: { id: true }
        },
        _count: {
            select: {
                favorites: true,
                likes: true
            }
        }
    }
}>

const recosAll: PrismaRecommandationWithAll[] = [
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

type PrismaRecommandationWithLess = Prisma.RecommandationGetPayload<{
    include: {
        recommandationAnimes: {
            select: {
                id: true,
                anime: {
                    select: {
                        id: true,
                        main_title: true
                    }
                }
            }
        },
        author: {
            select: {
                username: true
            }
        },
        _count: {
            select: {
                favorites: true,
                likes: true
            }
        }
    }
}>

const recosLess: PrismaRecommandationWithLess[] = [
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

type PrismaRecommandationWithMin = Prisma.RecommandationGetPayload<{
    include: {
        recommandationAnimes: {
            select: {
                id: true,
                anime: {
                    select: {
                        id: true,
                        main_title: true
                    }
                }
            }
        },
        author: {
            select: {
                username: true
            }
        }
    }
}>

const recosMin: PrismaRecommandationWithMin[] = [
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
]

class InMemoryRecommandationRepository implements RecommandationRepositoryInterface {
    async getFavoriteRecommandations(userId: string): Promise<Recommandation[]> {
        if (userId !== "user1" && userId !== "user2") return [];
        else if (userId === "user2") return [sanitizeRecommandation(recosMin[0], recosMin[0].authorId === userId)];

        return recosMin.map(reco => sanitizeRecommandation(reco, reco.authorId === userId));
    }

    async getRecommandations(authorId: string): Promise<Recommandation[] | null> {
        if (authorId !== "user2") return null;

        return recosAll.map(reco => sanitizeRecommandation(reco, reco.authorId === authorId));
    }

    async getRecommandationById(id: string, authorId: string): Promise<Recommandation | null> {
        if (authorId !== "user2") return null;

        const recommandation = recosAll.find(r => r.id === id);

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation, recommandation.authorId === authorId);
    }

    async getRecommandationByPage(selectedPage: number, maxItems: number, userId?: string): Promise<GetRecommandationByPageOutputs | null> {
        let recommandations = [...recosLess];

        if (userId !== undefined) {
            if (userId === "user1") recommandations = [...recosAll];
            if (userId === "user2") recommandations = [recosAll[0], recosLess[1]];
        };

        if (!recommandations) return null;
        if (selectedPage > 0 && maxItems > 2) return {
            recommandations: [],
            total: Math.ceil(recommandations.length / maxItems)
        }

        return {
            recommandations: recommandations.map(reco => sanitizeRecommandation(reco, (userId !== undefined && reco.authorId === userId))),
            total: Math.ceil(recommandations.length / maxItems)
        }
    }

    async createRecommandation(authorId: string, title: string, description: string): Promise<void> {}

    async addFavorite(id: string, userId: string): Promise<Recommandation | null> {
        if (userId !== "user2" || id !== "reco2") return null;

        const recommandation = {
            ...recosLess[1],
            favorites: [
                {
                    id: "fav3"
                }
            ],
            _count: {
                favorites: 5,
                likes: 3
            }
        }

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation, recommandation.authorId === userId);
    }

    async addLike(id: string, userId: string): Promise<Recommandation | null> {
        if (userId !== "user2" || id !== "reco2") return null;

        const recommandation = {
            ...recosLess[1],
            likes: [
                {
                    id: "like4"
                }
            ],
            _count: {
                favorites: 4,
                likes: 4
            }
        }

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation, recommandation.authorId === userId);
    }

    async addAnime(id: string, animeId: string, authorId: string): Promise<Recommandation | null> {
        if (authorId !== "user2") return null;

        const selectedRecommandation = recosAll.find(r => r.id === id);

        if (!selectedRecommandation) return null;

        const recommandation = {
            ...selectedRecommandation,
            recommandationAnimes: [
                ...selectedRecommandation.recommandationAnimes,
                {
                    id: "ra4",
                    anime: {
                        id: animeId,
                        main_title: "New Anime"
                    }
                }
            ]
        }

        return sanitizeRecommandation(recommandation, recommandation.authorId === authorId);
    }

    async updateRecommandation(id: string, title: string, description: string, authorId: string): Promise<Recommandation> {
        if (id !== "reco1" && id !== "reco2" && authorId !== "user2") throw new Error("Une erreur est survenue");

        const selectedRecommandation = recosMin.find(r => r.id === id);

        if (!selectedRecommandation) throw new Error("Une erreur est survenue");

        const recommandation = {
            ...selectedRecommandation,
            title,
            description
        }

        return sanitizeRecommandation(recommandation, recommandation.authorId === authorId);
    }

    async removeAnime(id: string): Promise<void> {
        if (id !== "ra1" && id !== "ra2" && id !== "ra3") throw new Error("Une erreur est survenue");
    }

    async removeFavorite(id: string): Promise<void> {
        if (id !== "fav1" && id !== "fav2") throw new Error("Une erreur est survenue");
    }

    async removeLike(id: string): Promise<void> {
        if (id !== "like1" && id !== "like3") throw new Error("Une erreur est survenue");
    }

    async deleteRecommandation(id: string, authorId: string): Promise<void> {
        if ((id !== "reco1" && id !== "reco2") || authorId !== "user2") throw new Error("Une erreur est survenue");
    }
}

export default InMemoryRecommandationRepository;