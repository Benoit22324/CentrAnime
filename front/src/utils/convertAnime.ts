import Anime from "../domain/entities/Anime";

export const convertAnime = (anime: any) => {
    return new Anime(
        anime.id,
        anime.main_title,
        anime.en_title,
        anime.type,
        anime.episodes,
        anime.status,
        anime.posterUrl,
        anime.startDate,
        anime.endDate,
        anime.popularity,
        anime.synopsis,
        anime.updatedAt,
        anime.genres
    )
}