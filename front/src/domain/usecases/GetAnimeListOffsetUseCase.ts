import type { GetAnimeListOffsetInput } from "../../interfaces/inputs/GetAnimeListOffsetInput";
import type { GetAnimeListOffsetOutput } from "../../interfaces/outputs/GetAnimeListOffsetOutput";
import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";

class GetAnimeListOffsetUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(input: GetAnimeListOffsetInput): Promise<GetAnimeListOffsetOutput> {
        const { selectedPage, maxItems } = input;

        try {
            const anilists = await this.animeListRepository.getAnimeListOffset(selectedPage, maxItems);

            return anilists;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetAnimeListOffsetUseCase;