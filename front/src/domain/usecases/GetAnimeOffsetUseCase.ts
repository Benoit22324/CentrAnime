import type { GetAnimeOffsetInput } from "../../interfaces/inputs/GetAnimeOffsetInput";
import type { GetAnimeOffsetOutput } from "../../interfaces/outputs/GetAnimeOffsetOutput";
import type { AnimeRepositoryInterface } from "../../interfaces/repositories/AnimeRepositoryInterface";

class GetAnimeOffsetUseCase {
    constructor(private readonly animeRepository: AnimeRepositoryInterface) { }

    async execute(input: GetAnimeOffsetInput): Promise<GetAnimeOffsetOutput> {
        // Déstructuration des données à l'entrée pour s'assurer d'avoir les bonnes
        const { selectedPage, maxItems, searchName, filterGenre } = input;

        try {
            // Appel du Repository d'anime
            const response = await this.animeRepository.getAnimeOffset(selectedPage, maxItems, searchName, filterGenre);

            return response;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetAnimeOffsetUseCase;