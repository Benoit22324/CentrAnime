import type AnimeList from "../../domain/entities/AnimeList";

export interface GetAnimeListOffsetOutput {
    animeLists: AnimeList[],
    total: number
}