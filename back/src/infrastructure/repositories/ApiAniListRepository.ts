import { ApiAniListRepositoryInterface } from "../../domain/interfaces/ApiAniListRepositoryInterface";
import { prisma } from "../../api/config/client";
import { sanitizeAnime } from "../../api/utility";
import Anime from "../../domain/entities/Anime";
import { Prisma } from "@prisma/client";
import { GetAnimesByPageOutputs } from "../../api/dto";

class ApiAniListRepository implements ApiAniListRepositoryInterface {
    async getApiAnimes(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs | undefined | null> {
        // Préparation de la requête Graphql
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
        // Préparation des variables à l'envoie
        const variables = {
            page: selectedPage + 1,
            maxItems,
            search: searchName,
            genre: filterGenre
        }

        // Mise en place des options
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

        // Appel à l'API
        const response: any = await fetch("https://graphql.anilist.co", options);

        // On continue si on a une réponse
        if (response.ok) {
            // Extraction des données en json (la fonction json est asynchrone)
            const dataExtracted = await response.json();

            // Liste final en retour (vide pour le moment)
            let animeFinalList: Anime[] = [];
            // Récupération des animes récupérés
            const animesList = dataExtracted.data.Page.media;

            // Récupération de la plateforme AniList (là où on récupère les données)
            let platformId = "";
            const platformDb = await prisma.platform.findFirst({
                where: {
                    platformName: "AniList"
                }
            })

            // S'il n'existe pas, on le créer puis on récupère l'id
            if (!platformDb) {
                const platformData = await prisma.platform.create({
                    data: {
                        platformName: "AniList",
                        link: "https://anilist.co"
                    }
                })

                platformId = platformData.id
            // Sinon, on récupère l'id
            } else platformId = platformDb.id

            // Boucle sur tous les animes récupérés de l'API
            for (const anime of animesList) {
                // Préparation de la recherche en bdd
                const searchWhere: Prisma.AnimeWhereInput = {
                    main_title: anime.title.romaji
                }

                // Si l'anime récupéré en bdd contient un titre en anglais (possible qu'il n'y en a pas)
                if (anime.title.english) {
                    searchWhere.en_title = anime.title.english
                }
                // Récupération de l'anime en bdd
                const dbAnime = await prisma.anime.findFirst({
                    where: searchWhere
                });

                // Vérification s'il existe et s'il a été mis à jour durant les 24h
                if (dbAnime && new Date(dbAnime.updatedAt.getTime() + 86400000).getTime() > new Date().getTime()) return null

                // Si l'anime existe déjà et qu'il n'a pas été mis à jour durant + de 24h
                if (dbAnime && new Date(dbAnime.updatedAt.getTime() + 86400000).getTime() <= new Date().getTime()) {
                    // Mise à jour de sa popularité et de son statut
                    await prisma.anime.update({
                        where: { id: dbAnime.id },
                        data: {
                            updatedAt: new Date(),
                            popularity: anime.popularity,
                            status: anime.status
                        }
                    })

                    // Mise à jour de son rang
                    await prisma.rank.update({
                        where: { id: dbAnime.rankId },
                        data: {
                            rank: anime.rankings[0].rank || 0
                        }
                    })

                    // Mise à jour de son score
                    await prisma.score.update({
                        where: { id: dbAnime.scoreId },
                        data: {
                            score: anime.averageScore || 0
                        }
                    })

                    // Retour pour passer au prochain anime de la liste
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

                // Ajout du studio et récupération de l'id s'il n'existe pas
                if (!dbStudio) {
                    const studioData = await prisma.studio.create({
                        data: {
                            studioName: studio ? studio.name : anime.studios.nodes[0].name
                        }
                    });

                    studioId = studioData.id;
                // Récupération de l'id du studio
                } else studioId = dbStudio.id;

                // Vérification de si on a bien récupéré l'id de la plateforme (ici AniList)
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

                        // Création du genre s'il n'existe pas puis on récupère son id
                        if (!genreDb) {
                            const genreData = await prisma.genre.create({
                                data: {
                                    genreName: g
                                }
                            });

                            genreId = genreData.id;
                        // S'il existe, on récupère l'id du genre
                        } else genreId = genreDb.id;

                        // Lien entre le genre et l'anime
                        await prisma.animeGenre.create({
                            data: {
                                genreId,
                                animeId: animeData.id
                            }
                        });
                    })

                    // Attendre que tous les liens des différents genres soient faites
                    await Promise.all(animeGenrePromises);

                    // Récupération de l'anime mis à jour en bdd
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

                    // Si on récupère bien l'anime, on le met au propre puis on le met dans la liste d'anime final
                    if (cleanAnimeData) {
                        animeFinalList.push(sanitizeAnime(cleanAnimeData));
                    }
                }
            }

            // Préparation de la requête de récupération du total
            const where: Prisma.AnimeWhereInput = {};

            // Si searchName est défini (donc on fait une recherche par nom), on l'ajoute à la requête
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
            // Si filterGenre est défini (donc on fait une recherche par genre), on l'ajoute à la requête
            if (filterGenre) {
                where.animeGenres = {
                    some: {
                        genre: {
                            genreName: filterGenre.trim()
                        }
                    }
                }
            }

            // Calcul du nombre total d'anime bdd selon la requête
            const total = await prisma.anime.count({
                where
            });

            // Retour du tableau d'anime et du total
            return {
                animes: animeFinalList,
                total
            };
        }
    }
}

export default ApiAniListRepository;