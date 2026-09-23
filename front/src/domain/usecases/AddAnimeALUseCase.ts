import type { AddAnimeALInput } from "../../interfaces/inputs/AddAnimeALInput";
import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";
import type AnimeList from "../entities/AnimeList";

class AddAnimeALUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(input: AddAnimeALInput): Promise<AnimeList | null> {
        const { anilistId, animeId } = input;

        try {
            const anilist = await this.animeListRepository.addAnimeAL(anilistId, animeId);

            return anilist;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AddAnimeALUseCase;