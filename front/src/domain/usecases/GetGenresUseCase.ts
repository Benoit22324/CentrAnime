import type { GenreRepositoryInterface } from "../../interfaces/repositories/GenreRepositoryInterface";
import type Genre from "../entities/Genre";

class GetGenresUseCase {
    constructor(private readonly genreRepository: GenreRepositoryInterface) { }

    async execute(): Promise<Genre[] | null> {
        try {
            const response = await this.genreRepository.getGenres();

            return response;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetGenresUseCase;