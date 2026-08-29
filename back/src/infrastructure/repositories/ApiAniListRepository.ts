import { ApiAniListRepositoryInterface } from "../../domain/interfaces/ApiAniListRepositoryInterface";
import { prisma } from "../../api/config/client";
import { sanitizeAnime } from "../../api/utility";
import Anime from "../../domain/entities/Anime";
import { Prisma } from "@prisma/client";
import { GetAnimesByPageOutputs } from "../../api/dto";

class ApiAniListRepository implements ApiAniListRepositoryInterface {
    async getApiAnimes(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs | undefined | null> {
        const query = `
            query ($page: Int, $maxItems: Int, $search: String, $genre: String) {
                Page(page: $page, perPage: $maxItems) {
                    media(
                        search: $search
                        genre: $genre
                        type: ANIME
                        format_in: [TV, MOVIE, ONA]
                        sort: POPULARITY_DESC
                    ) {
                        id
                        title {
                            romaji
                            english
                        }
                        studios {
                            nodes {
                                name
                                isAnimationStudio
                            }
                        }
                        format
                        status
                        episodes
                        startDate {
                            year
                            month
                            day
                        }
                        endDate {
                            year
                            month
                            day
                        }
                        description
                        rankings {
                            rank
                            type
                            allTime
                            context
                        }
                        averageScore
                        popularity
                        coverImage {
                            large
                        }
                        genres
                    }
                }
            }
        `;
        const variables = {
            page: selectedPage + 1,
            maxItems,
            search: searchName,
            genre: filterGenre
        }

        const options = {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            method: "POST",
            body: JSON.stringify({
                query,
                variables
            })
        }

        const response: any = await fetch("https://graphql.anilist.co", options);

        if (response.ok) {
            const dataExtracted = await response.json();

            let animeFinalList: Anime[] = [];
            const animesList = dataExtracted.data.Page.media;

            // Récupération de la plateforme AniList (là où on récupère les données)
            let platformId = "";
            const platformDb = await prisma.platform.findFirst({
                where: {
                    platformName: "AniList"
                }
            })

            // S'il n'existe pas, on le créer
            if (!platformDb) {
                const platformData = await prisma.platform.create({
                    data: {
                        platformName: "AniList",
                        link: "https://anilist.co"
                    }
                })

                platformId = platformData.id
            } else platformId = platformDb.id

            for (const anime of animesList) {
                const searchWhere: Prisma.AnimeWhereInput = {
                    main_title: anime.title.romaji
                }

                if (anime.title.english) {
                    searchWhere.en_title = anime.title.english
                }
                // Récupération de l'anime en bdd
                const dbAnime = await prisma.anime.findFirst({
                    where: searchWhere
                });

                // Vérification s'il existe ou s'il a été mis à jour durant les 24h
                if (dbAnime && new Date(dbAnime.updatedAt.getTime() + 86400000).getTime() > new Date().getTime()) return null

                // Si l'anime existe déjà et qu'il n'a pas été mis à jour durant + de 24h
                if (dbAnime && new Date(dbAnime.updatedAt.getTime() + 86400000).getTime() <= new Date().getTime()) {
                    await prisma.anime.update({
                        where: { id: dbAnime.id },
                        data: {
                            updatedAt: new Date(),
                            popularity: anime.popularity,
                            status: anime.status
                        }
                    })

                    await prisma.rank.update({
                        where: { id: dbAnime.rankId },
                        data: {
                            rank: anime.rankings[0].rank || 0
                        }
                    })

                    await prisma.score.update({
                        where: { id: dbAnime.scoreId },
                        data: {
                            score: anime.averageScore || 0
                        }
                    })

                    return null
                }

                // Vérification si le studio existe
                const studio = anime.studios.nodes.filter(s => s.isAnimationStudio)[0];
                let studioId = "";

                const dbStudio = await prisma.studio.findFirst({
                    where: {
                        studioName: studio ? studio.name : anime.studios.nodes[0].name
                    }
                });

                if (!dbStudio) {
                    // Ajout du studio et récupération de l'id s'il n'existe pas
                    const studioData = await prisma.studio.create({
                        data: {
                            studioName: studio ? studio.name : anime.studios.nodes[0].name
                        }
                    });

                    studioId = studioData.id;
                } else studioId = dbStudio.id;

                if (platformId) {
                    // Création en bdd du rang
                    const rankData = await prisma.rank.create({
                        data: {
                            rank: anime.rankings[0] ? anime.rankings[0].rank : 0,
                            platformId
                        }
                    });
                    // Création en bdd du score
                    const scoreData = await prisma.score.create({
                        data: {
                            score: anime.averageScore / 10 || 0,
                            platformId
                        }
                    })

                    // Valeurs à stocker en bdd
                    const data = {
                        main_title: anime.title.romaji,
                        en_title: anime.title.english || "",
                        type: anime.format,
                        episodes: anime.episodes || 0,
                        status: anime.status,
                        posterUrl: anime.coverImage.large,
                        startDate: anime.startDate ? `${anime.startDate.day}/${anime.startDate.month}/${anime.startDate.year}` : "Indéterminé",
                        endDate: anime.endDate ? `${anime.endDate.day}/${anime.endDate.month}/${anime.endDate.year}` : "Indéterminé",
                        popularity: anime.popularity,
                        synopsis: anime.description,
                        updatedAt: new Date(),
                        rankId: rankData.id,
                        scoreId: scoreData.id
                    }

                    // Stockage en bdd
                    const animeData = await prisma.anime.create({
                        data
                    })

                    // Création du lien entre studio et anime
                    await prisma.animeStudio.create({
                        data: {
                            studioId,
                            animeId: animeData.id
                        }
                    })

                    // boucle sur tous les genres
                    const animeGenrePromises = anime.genres.map(async (g: string) => {
                        // Vérification si le genre existe
                        let genreId = "";
                        const genreDb = await prisma.genre.findFirst({
                            where: {
                                genreName: g
                            }
                        });

                        // Création du genre s'il n'existe pas
                        if (!genreDb) {
                            const genreData = await prisma.genre.create({
                                data: {
                                    genreName: g
                                }
                            });

                            genreId = genreData.id;
                        } else genreId = genreDb.id;

                        // Lien entre le genre et l'anime
                        await prisma.animeGenre.create({
                            data: {
                                genreId,
                                animeId: animeData.id
                            }
                        });
                    })

                    // Attendre que tous les liens soient faites
                    await Promise.all(animeGenrePromises);

                    const cleanAnimeData = await prisma.anime.findUnique({
                        where: { id: animeData.id },
                        include: {
                            animeGenres: {
                                select: {
                                    genre: {
                                        select: { genreName: true }
                                    }
                                }
                            }
                        },
                    });

                    if (cleanAnimeData) {
                        animeFinalList.push(sanitizeAnime(cleanAnimeData));
                    }
                }
            }

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

            const total = await prisma.anime.count({
                where
            });

            return {
                animes: animeFinalList,
                total
            };
        }
    }
}

export default ApiAniListRepository;