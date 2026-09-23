import AnimeList from "../../domain/entities/AnimeList";

export interface CreateAnimeListInputs {
    title: string
}

export interface GetAnimeListByPageOutputs {
    animeLists: AnimeList[],
    total: number
}