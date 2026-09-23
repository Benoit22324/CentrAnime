import { Prisma } from "@prisma/client";
import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";
import { sanitizeAnimeList } from "../../api/utility";
import AnimeList from "../../domain/entities/AnimeList";
import { GetAnimeListByPageOutputs } from "../../api/dto";

type ALWithAnimes = Prisma.AniListGetPayload<{
    include: {
        aniListAnimes: {
            select: {
                id: true,
                anime: {
                    select: {
                        id: true,
                        main_title: true
                    }
                }
            }
        }
    }
}>

const als: ALWithAnimes[] = [
    {
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
    },
    {
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
            }
        ]
    }
]

const newAl = {
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
}

class InMemoryAnimeListRepository implements AnimeListRepositoryInterface {
    async getAnimeLists(userId: string): Promise<AnimeList[] | null> {
        if (userId !== "user1") return null;

        return als.map(al => sanitizeAnimeList(al));
    }

    async getAnimeListById(id: string, userId: string): Promise<AnimeList | null> {
        const anilist = als.find(al => al.id === id && al.userId === userId);

        if (!anilist) return null;

        return sanitizeAnimeList(anilist);
    }

    async getAnimeListByPage(selectedPage: number, maxItems: number, userId: string): Promise<GetAnimeListByPageOutputs | null> {
        if (userId !== "user1") return null;
        if (selectedPage > 0 && maxItems > 2) return null;

        if (selectedPage < 2 && maxItems === 1) return {
            animeLists: [sanitizeAnimeList(als[selectedPage])],
            total: Math.ceil(als.length / maxItems)
        }

        return {
            animeLists: als.map(al => sanitizeAnimeList(al)),
            total: Math.ceil(als.length / maxItems)
        }
    }

    async createAnimeList(userId: string, title: string): Promise<void> {}

    async addAnime(id: string, animeId: string): Promise<AnimeList | null> {
        if (id !== "al2") return null;

        return sanitizeAnimeList(newAl);
    }

    async updateAnimeList(id: string, title: string): Promise<AnimeList> {
        const anilist = als.find(al => al.id === id);

        if (!anilist) throw new Error("Une erreur est survenue");

        const updatedAL = {
            ...anilist,
            title
        }

        return sanitizeAnimeList(updatedAL);
    }

    async removeAnime(id: string): Promise<void> {
        if (id !== "ala1" && id !== "ala2" && id !== "ala3") throw new Error("Une erreur est survenue");
    }

    async deleteAnimeList(id: string, userId: string): Promise<void> {
        if ((id !== "al1" && id !== "al2") || userId !== "user1") throw new Error("Une erreur est survenue");
    }
}

export default InMemoryAnimeListRepository;