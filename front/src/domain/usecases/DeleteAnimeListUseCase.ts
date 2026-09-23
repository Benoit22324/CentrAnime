import type { DeleteAnimeListInput } from "../../interfaces/inputs/DeleteAnimeListInput";
import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";

class DeleteAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(input: DeleteAnimeListInput): Promise<void> {
        const { id } = input;

        try {
            await this.animeListRepository.deleteAnimeList(id);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteAnimeListUseCase;