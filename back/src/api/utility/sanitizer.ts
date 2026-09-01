import { Anime as PrismaAnime, Recommandation as PrismaReco, Opinion as PrismaOpinion, Prisma, User, AniList } from "@prisma/client";
import Anime from "../../domain/entities/Anime";
import Opinion from "../../domain/entities/Opinion";
import AnimeList from "../../domain/entities/AnimeList";
import Recommandation from "../../domain/entities/Recommandation";

export const sanitizeUser = (user: User) => {
    const { salt, password, ...safeInfo } = user;

    return safeInfo;
}

type PrismaAnimeWithInclude = Prisma.AnimeGetPayload<{
    include: {
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
        }
        rank: {
            select: {
                rank: true
            },
            include: {
                platform: {
                    select: {
                        platformName: true,
                        link: true
                    }
                }
            }
        },
        score: {
            select: {
                score: true
            },
            include: {
                platform: {
                    select: {
                        platformName: true,
                        link: true
                    }
                }
            }
        },
        opinions: {
            select: {
                comment: true
            },
            include: {
                user: {
                    select: { username: true }
                }
            }
        }
    }
}>

export const sanitizeAnime = (anime: PrismaAnime) => {
    const a = anime as PrismaAnimeWithInclude;

    const genres = a.animeGenres.map(genre => genre.genre.genreName);

    if (a.rank && a.score && a.animeStudios) {
        return new Anime(
            a.id,
            a.main_title,
            a.en_title,
            a.type,
            a.episodes,
            a.status,
            a.posterUrl,
            a.startDate,
            a.endDate,
            a.popularity,
            a.synopsis,
            a.updatedAt,
            genres,
            {
                rank: a.rank.rank,
                platformName: a.rank.platform.platformName,
                link: a.rank.platform.link
            },
            {
                score: a.score.score,
                platformName: a.score.platform.platformName,
                link: a.score.platform.link
            },
            a.animeStudios[0].studio.studioName
        )
    }

    return new Anime(
        a.id,
        a.main_title,
        a.en_title,
        a.type,
        a.episodes,
        a.status,
        a.posterUrl,
        a.startDate,
        a.endDate,
        a.popularity,
        a.synopsis,
        a.updatedAt,
        genres,
        undefined,
        undefined,
        undefined
    )
}

export const sanitizeOpinion = (opinion: PrismaOpinion) => {
    return new Opinion(
        opinion.id,
        opinion.viewStatus ?? undefined,
        opinion.note ?? undefined,
        opinion.comment ?? undefined
    )
}

type PrismaAniListWithInclude = Prisma.AniListGetPayload<{
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

export const sanitizeAnimeList = (aniList: AniList) => {
    const al = aniList as PrismaAniListWithInclude;

    const animes = al.aniListAnimes.map(a => ({
        id: a.id,
        animeId: a.anime.id,
        title: a.anime.main_title
    }))

    return new AnimeList(
        al.id,
        al.title,
        animes
    )
}

type PrismaRecommandationWithInclude = Prisma.RecommandationGetPayload<{
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
        favorites: true,
        likes: true,
        _count: {
            select: {
                favorites: true,
                likes: true
            }
        }
    }
}>

export const sanitizeRecommandation = (recommandation: PrismaReco, isOwner?: boolean) => {
    const reco = recommandation as PrismaRecommandationWithInclude;

    const animes = reco.recommandationAnimes.map(a => ({
        id: a.id,
        animeId: a.anime.id,
        title: a.anime.main_title
    }))

    const userInteraction = {
        favoriteId: (reco.favorites && reco.favorites.length > 0) ? reco.favorites[0].id : "",
        likeId: (reco.likes && reco.likes.length > 0) ? reco.likes[0].id : ""
    };

    return new Recommandation(
        reco.id,
        reco.title,
        reco.description,
        animes,
        reco.author.username,
        isOwner ?? false,
        userInteraction,
        reco._count ? reco._count.likes : 0,
        reco._count ? reco._count.favorites : 0,
    )
}