import type { GetAnimeListByIdInput } from "../../interfaces/inputs/GetAnimeListByIdInput";
import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";
import type AnimeList from "../entities/AnimeList";

class GetAnimeListByIdUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(input: GetAnimeListByIdInput): Promise<AnimeList | null> {
        const { id } = input;

        try {
            const anilist = await this.animeListRepository.getAnimeListById(id);

            return anilist;
        } catch (error) {
            throw new Error("Une erreur est survenues");
        }
    }
}

export default GetAnimeListByIdUseCase;