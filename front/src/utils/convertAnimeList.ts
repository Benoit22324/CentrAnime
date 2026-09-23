import AnimeList from "../domain/entities/AnimeList"

export const convertAnimeList = (anilist: any) => {
    return new AnimeList(
        anilist.id,
        anilist.title,
        anilist.animes
    )
}