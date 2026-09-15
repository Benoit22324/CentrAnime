import { Prisma } from "@prisma/client";
import { GetAnimesByPageOutputs } from "../../api/dto";
import { ApiAniListRepositoryInterface } from "../../domain/interfaces/ApiAniListRepositoryInterface";
import { sanitizeAnime } from "../../api/utility";

type AnimeWithGenre = Prisma.AnimeGetPayload<{
    include: {
        animeGenres: {
            select: {
                genre: {
                    select: { genreName: true }
                }
            }
        }
    }
}>

const animes: AnimeWithGenre[] = [
    {
        id: "1",
        main_title: "Anime 1",
        en_title: "Anime 1 EN",
        type: "TV",
        episodes: 12,
        status: "FINISHED",
        posterUrl: "anime1.webp",
        startDate: "01/04/2026",
        endDate: "30/06/2026",
        popularity: 163502,
        synopsis: "Synopsis de l'anime 1",
        updatedAt: new Date("09-04-2026"),
        rankId: "rank_anime_1",
        scoreId: "score_anime_1",
        animeGenres: [
            {
                genre: {
                    genreName: "Action"
                }
            },
            {
                genre: {
                    genreName: "Drama"
                }
            },
            {
                genre: {
                    genreName: "Sci-fi"
                }
            }
        ]
    },
    {
        id: "2",
        main_title: "Anime 2",
        en_title: "Anime 2 EN",
        type: "ONA",
        episodes: 11,
        status: "RELEASING",
        posterUrl: "anime2.webp",
        startDate: "03/09/2026",
        endDate: "27/12/2026",
        popularity: 119530,
        synopsis: "Synopsis de l'anime 2",
        updatedAt: new Date("09-01-2026"),
        rankId: "rank_anime_2",
        scoreId: "score_anime_2",
        animeGenres: [
            {
                genre: {
                    genreName: "Comedy"
                }
            },
            {
                genre: {
                    genreName: "Romance"
                }
            }
        ]
    },
    {
        id: "3",
        main_title: "Anime 3",
        en_title: "Anime 3 EN",
        type: "TV",
        episodes: 13,
        status: "FINISHED",
        posterUrl: "anime3.webp",
        startDate: "01/04/2026",
        endDate: "30/06/2026",
        popularity: 151922,
        synopsis: "Synopsis de l'anime 3",
        updatedAt: new Date("09-04-2026"),
        rankId: "rank_anime_3",
        scoreId: "score_anime_3",
        animeGenres: [
            {
                genre: {
                    genreName: "Action"
                }
            },
            {
                genre: {
                    genreName: "Drama"
                }
            }
        ]
    },
    {
        id: "4",
        main_title: "Anime 4",
        en_title: "Anime 4 EN",
        type: "TV",
        episodes: 13,
        status: "RELEASING",
        posterUrl: "anime4.webp",
        startDate: "07/09/2026",
        endDate: "30/12/2026",
        popularity: 106528,
        synopsis: "Synopsis de l'anime 4",
        updatedAt: new Date("09-04-2026"),
        rankId: "rank_anime_4",
        scoreId: "score_anime_4",
        animeGenres: [
            {
                genre: {
                    genreName: "Comedy"
                }
            },
            {
                genre: {
                    genreName: "Action"
                }
            },
            {
                genre: {
                    genreName: "Fantasy"
                }
            }
        ]
    },
    {
        id: "5",
        main_title: "Anime 5",
        en_title: "Anime 5 EN",
        type: "MOVIE",
        episodes: 1,
        status: "FINISHED",
        posterUrl: "anime4.webp",
        startDate: "02/09/2026",
        endDate: "02/09/2026",
        popularity: 136985,
        synopsis: "Synopsis de l'anime 5",
        updatedAt: new Date("09-04-2026"),
        rankId: "rank_anime_5",
        scoreId: "score_anime_5",
        animeGenres: [
            {
                genre: {
                    genreName: "Drama"
                }
            },
            {
                genre: {
                    genreName: "Action"
                }
            },
            {
                genre: {
                    genreName: "Fantasy"
                }
            }
        ]
    }
]

class InMemoryApiAniListRepository implements ApiAniListRepositoryInterface {
    async getApiAnimes(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs | undefined | null> {
        if (selectedPage > 0 && maxItems > 5) return {
            animes: [],
            total: 0
        }

        if (searchName && filterGenre) {
            const filteredList = animes.filter(a => (a.main_title.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) || a.en_title.toLocaleLowerCase().includes(searchName.toLocaleLowerCase())) && a.animeGenres.some(g => g.genre.genreName.toLocaleLowerCase() === filterGenre.toLocaleLowerCase()))

            return {
                animes: filteredList.map(a => sanitizeAnime(a)),
                total: Math.ceil(filteredList.length / maxItems)
            }
        } else if (searchName && !filterGenre) {
            const filteredList = animes.filter(a => a.main_title.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()) || a.en_title.toLocaleLowerCase().includes(searchName.toLocaleLowerCase()))

            return {
                animes: filteredList.map(a => sanitizeAnime(a)),
                total: Math.ceil(filteredList.length / maxItems)
            }
        } else if (!searchName && filterGenre) {
            const filteredList = animes.filter(a => a.animeGenres.some(g => g.genre.genreName.toLocaleLowerCase() === filterGenre.toLocaleLowerCase()))

            return {
                animes: filteredList.map(a => sanitizeAnime(a)),
                total: Math.ceil(filteredList.length / maxItems)
            }
        }

        return {
            animes: animes.map(a => sanitizeAnime(a)),
            total: Math.ceil(animes.length / maxItems)
        }
    }
}

export default InMemoryApiAniListRepository;