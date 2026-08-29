import { Genre } from "@prisma/client";
import { GenreRepositoryInterface } from "../../domain/interfaces/GenreRepositoryInterface";

class GetGenresUseCase {
    constructor(private readonly genreRepository: GenreRepositoryInterface) { }

    async execute(): Promise<Genre[] | null> {
        try {
            const genres = await this.genreRepository.getGenres();

            return genres;
        } catch (error) {
            throw new Error("Genres introuvables");
        }
    }
}

export default GetGenresUseCase;