import type { RemoveAnimeALInput } from "../../interfaces/inputs/RemoveAnimeALInput";
import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";

class RemoveAnimeALUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(input: RemoveAnimeALInput): Promise<void> {
        const { id } = input;

        try {
            await this.animeListRepository.removeAnimeAL(id);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveAnimeALUseCase;