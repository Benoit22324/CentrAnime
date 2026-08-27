export interface AnimeRepositoryInterface {
    getAnimeOffset(selectedPage: number, maxItems: number, searchName: string, filterGenre: string): Promise<void>
}