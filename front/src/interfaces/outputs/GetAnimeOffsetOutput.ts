import type Anime from "../../domain/entities/Anime";

export interface GetAnimeOffsetOutput {
    animes: Anime[],
    total: number
}