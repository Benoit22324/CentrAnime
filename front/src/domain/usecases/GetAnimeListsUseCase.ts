import type { AnimeListRepositoryInterface } from "../../interfaces/repositories/AnimeListRepositoryInterface";
import type AnimeList from "../entities/AnimeList";

class GetAnimeListsUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(): Promise<AnimeList[] | null> {
        try {
            const aniLists = await this.animeListRepository.getAnimeLists();

            return aniLists;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetAnimeListsUseCase;