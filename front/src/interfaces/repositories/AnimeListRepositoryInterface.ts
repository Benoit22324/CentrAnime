import type AnimeList from "../../domain/entities/AnimeList"

export interface AnimeListRepositoryInterface {
    getAnimeLists(): Promise<AnimeList[] | null>
    addAnimeAL(anilistId: string, animeId: string): Promise<AnimeList | null>
}