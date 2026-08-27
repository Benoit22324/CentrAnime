import { Anime } from "@prisma/client";
import { GetAnimesByPageOutputs } from "../../api/dto";

export interface AnimeRepositoryInterface {
    getAnimesByPage(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs | null>
    getAnime(id: string): Promise<Anime>
}