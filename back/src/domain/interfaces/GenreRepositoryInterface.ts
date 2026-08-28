import { Genre } from "@prisma/client";

export interface GenreRepositoryInterface {
    getGenres(): Promise<Genre[] | null>
}