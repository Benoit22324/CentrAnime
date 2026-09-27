import { Anime, Prisma } from "@prisma/client";
import { AnimeRepositoryInterface } from "../../domain/interfaces/AnimeRepositoryInterface";
import { prisma } from "../../api/config/client";
import { GetAnimesByPageOutputs } from "../../api/dto";
import { sanitizeAnime } from "../../api/utility";

class AnimeRepository implements AnimeRepositoryInterface {
    async getAnimesByPage(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs | null> {
        // Préparation des conditions (s'il y en a)
        const where: Prisma.AnimeWhereInput = {};

        // Ajout de la condition sur le titre si on recherche sur le nom
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
        // Ajout de la condition sur le genre si on recherche par genre
        if (filterGenre) {
            where.animeGenres = {
                some: {
                    genre: {
                        genreName: filterGenre.trim()
                    }
                }
            }
        }

        // Récupération des animes en offset
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

        // Récupération du nombre total de page
        const totalAnimes = await prisma.anime.count({
            where
        }) / maxItems;

        // Retour null si aucun anime est récupéré
        if (!animes) return null;

        // Formatage de la réponse
        return {
            animes: animes.map(anime => sanitizeAnime(anime)),
            total: Math.ceil(totalAnimes)
        };
    }

    async getAnime(id: string): Promise<Anime> {
        const anime = await prisma.anime.findUnique({
            where: { id },
            include: {
                score: {
                    select: {
                        score: true,
                        platform: {
                            select: {
                                platformName: true,
                                link: true
                            }
                        }
                    }
                },
                rank: {
                    select: {
                        rank: true,
                        platform: {
                            select: {
                                platformName: true,
                                link: true
                            }
                        }
                    }
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