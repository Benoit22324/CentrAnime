import Anime from "../../domain/entities/Anime";

export interface GetAnimesByPageOutputs {
    animes: Anime[],
    total: number
}