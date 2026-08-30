import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";
import { GetAnimeListByPageOutputs } from "../../api/dto/animeListDto";
import { prisma } from "../../api/config/client";
import { sanitizeAnimeList } from "../../api/utility";
import AnimeList from "../../domain/entities/AnimeList";

class AnimeListRepository implements AnimeListRepositoryInterface {
    async getAnimeLists(userId: string): Promise<AnimeList[] | null> {
        const anilists = await prisma.aniList.findMany({
            where: { userId },
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
        });

        if (!anilists) return null;

        return anilists.map(al => sanitizeAnimeList(al));
    }

    async getAnimeListById(id: string, userId: string): Promise<AnimeList | null> {
        const anilist = await prisma.aniList.findUnique({
            where: {
                id,
                userId
            },
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
        });

        if (!anilist) return null;

        return sanitizeAnimeList(anilist);
    }

    async getAnimeListByPage(selectedPage: number, maxItems: number, userId: string): Promise<GetAnimeListByPageOutputs | null> {
        const anilists = await prisma.aniList.findMany({
            where: { userId },
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
            },
            take: maxItems,
            skip: maxItems * selectedPage,
        });
        
        const totalList = await prisma.aniList.count({
            where: { userId }
        }) / maxItems

        if (!anilists) return null;

        return {
            animeLists: anilists.map(al => sanitizeAnimeList(al)),
            total: Math.ceil(totalList)
        }
    }

    async createAnimeList(userId: string, title: string): Promise<void> {
        await prisma.aniList.create({
            data: {
                title,
                userId
            }
        });
    }

    async addAnime(id: string, animeId: string): Promise<AnimeList | null> {
        await prisma.aniListAnime.create({
            data: {
                aniListId: id,
                animeId
            }
        })

        const anilist = await prisma.aniList.findUnique({
            where: { id },
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
        });

        if (!anilist) return null;

        return sanitizeAnimeList(anilist);
    }

    async updateAnimeList(id: string, title: string): Promise<AnimeList> {
        const anilist = await prisma.aniList.update({
            where: { id },
            data: {
                title
            }
        });

        return sanitizeAnimeList(anilist);
    }

    async removeAnime(id: string): Promise<void> {
        await prisma.aniListAnime.delete({
            where: { id }
        })
    }

    async deleteAnimeList(id: string, userId: string): Promise<void> {
        await prisma.aniListAnime.deleteMany({
            where: {
                aniListId: id
            }
        });

        await prisma.aniList.delete({
            where: {
                id,
                userId
            }
        });
    }
}

export default AnimeListRepository;