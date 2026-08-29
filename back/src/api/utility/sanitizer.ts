import { Anime as PrismaAnime, Opinion as PrismaOpinion, Prisma, User } from "@prisma/client";
import Anime from "../../domain/entities/Anime";
import Opinion from "../../domain/entities/Opinion";

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