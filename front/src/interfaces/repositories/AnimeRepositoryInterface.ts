import type { GetAnimeOffsetOutput } from "../outputs/GetAnimeOffsetOutput";

export interface AnimeRepositoryInterface {
    getAnimeOffset(selectedPage: number, maxItems: number, searchName?: string, filterGenre?: string): Promise<GetAnimeOffsetOutput>
}