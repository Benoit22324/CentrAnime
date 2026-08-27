import { Anime as PrismaAnime, Prisma, User } from "@prisma/client";
import Anime from "../../domain/entities/Anime";

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
        rank: true,
        score: true
    }
}>

export const sanitizeAnime = (anime: PrismaAnime) => {
    const a = anime as PrismaAnimeWithInclude;

    const genres = a.animeGenres.map(genre => genre.genre.genreName)

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
        genres
    )
}