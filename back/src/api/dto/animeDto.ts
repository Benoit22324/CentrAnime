import { Anime } from "@prisma/client"

export interface GetAnimesByPageOutputs {
    animes: Anime[],
    total: number
}