export interface AniListRepositoryInterface {
    getApiAnimes(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<void>
}