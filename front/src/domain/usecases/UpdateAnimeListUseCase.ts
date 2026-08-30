import type { UpdateAnimeListInput } from "../../interfaces/inputs/UpdateAnimeListInput";
import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";
import type AnimeList from "../entities/AnimeList";

class UpdateAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(input: UpdateAnimeListInput): Promise<AnimeList | null> {
        const { id, title } = input;

        try {
            const anilist = await this.animeListRepository.updateAnimeList(id, title);

            return anilist;
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateAnimeListUseCase;