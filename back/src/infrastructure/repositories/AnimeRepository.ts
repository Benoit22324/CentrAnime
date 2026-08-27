import { Anime, Prisma } from "@prisma/client";
import { AnimeRepositoryInterface } from "../../domain/interfaces/AnimeRepositoryInterface";
import { prisma } from "../../api/config/client";
import { GetAnimesByPageOutputs } from "../../api/dto";

class AnimeRepository implements AnimeRepositoryInterface {
    async getAnimesByPage(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs | null> {
        const where: Prisma.AnimeWhereInput = {};

        if (searchName) {
            where.OR = [
                {
                    main_title: {
                        contains: searchName.trim(),
                        mode: "insensitive"
                    }
                },
                {
                    en_title: {
                        contains: searchName.trim(),
                        mode: "insensitive"
                    }
                }
            ]
        }
        if (filterGenre) {
            where.animeGenres = {
                some: {
                    genre: {
                        genreName: filterGenre.trim()
                    }
                }
            }
        }

        const animes = await prisma.anime.findMany({
            where,
            include: {
                animeGenres: {
                    select: {
                        genre: {
                            select: { genreName: true }
                        }
                    }
                }
            },
            take: maxItems,
            skip: maxItems * selectedPage,
            orderBy: { popularity: "desc" }
        });

        const totalAnimes = await prisma.anime.count({
            where
        }) / maxItems;

        if (!animes) return null;

        return {
            animes,
            total: Math.ceil(totalAnimes)
        };
    }

    async getAnime(id: string): Promise<Anime> {
        const anime = await prisma.anime.findUnique({
            where: { id },
            include: {
                score: {
                    select: { score: true }
                },
                rank: {
                    select: { rank: true }
                },
                animeGenres: {
                    include: {
                        genre: {
                            select: { genreName: true }
                        }
                    }
                },
                animeStudios: {
                    include: {
                        studio: {
                            select: { studioName: true }
                        }
                    }
                },
                opinions: {
                    select: {
                        comment: true,
                        user: {
                            select: { username: true }
                        }
                    }
                }
            }
        });

        if (!anime) throw new Error("Anime introuvable");

        return anime;
    }
}

export default AnimeRepository;