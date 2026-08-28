import type Genre from "../../domain/entities/Genre";

export interface GenreRepositoryInterface {
    getGenres(): Promise<Genre[] | null>
}