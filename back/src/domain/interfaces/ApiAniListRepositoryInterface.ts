import { GetAnimesByPageOutputs } from "../../api/dto";

export interface ApiAniListRepositoryInterface {
    getApiAnimes(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs | undefined | null>
}