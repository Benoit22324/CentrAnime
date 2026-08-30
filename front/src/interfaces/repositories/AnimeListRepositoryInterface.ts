import type AnimeList from "../../domain/entities/AnimeList"
import type { GetAnimeListOffsetOutput } from "../outputs/GetAnimeListOffsetOutput"

export interface AnimeListRepositoryInterface {
    getAnimeLists(): Promise<AnimeList[] | null>
    getAnimeListOffset(selectedPage: number, maxItems: number): Promise<GetAnimeListOffsetOutput>
    getAnimeListById(id: string): Promise<AnimeList | null>
    createAnimeList(title: string): Promise<void>
    addAnimeAL(anilistId: string, animeId: string): Promise<AnimeList | null>
    updateAnimeList(id: string, title: string): Promise<AnimeList | null>
    removeAnimeAL(id: string): Promise<void>
    deleteAnimeList(id: string): Promise<void>
}