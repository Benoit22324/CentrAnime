import type { CreateAnimeListInput } from "../../interfaces/inputs/CreateAnimeListInput";
import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";

class CreateAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(input: CreateAnimeListInput): Promise<void> {
        const { title } = input;

        try {
            await this.animeListRepository.createAnimeList(title);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateAnimeListUseCase;