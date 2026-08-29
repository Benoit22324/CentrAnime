import { GetAnimeListByPageOutputs } from "../../api/dto/animeListDto";
import AnimeList from "../entities/AnimeList";

export interface AnimeListRepositoryInterface {
    getAnimeLists(userId: string): Promise<AnimeList[] | null>
    getAnimeListById(id: string, userId: string): Promise<AnimeList | null>
    getAnimeListByPage(selectedPage: number, maxItems: number, userId: string): Promise<GetAnimeListByPageOutputs | null>
    createAnimeList(userId: string, title: string): Promise<void>
    addAnime(id: string, animeId: string): Promise<void>
    updateAnimeList(id: string, title: string): Promise<void>
    removeAnime(id: string): Promise<void>
    deleteAnimeList(id: string, userId: string): Promise<void>
}