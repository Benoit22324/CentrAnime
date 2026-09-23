import AnimeList from "../../domain/entities/AnimeList";
import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class GetAnimeListsUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(userId: string): Promise<AnimeList[] | null> {
        try {
            const aniLists = await this.animeListRepository.getAnimeLists(userId);

            return aniLists;
        } catch (err) {
            throw new Error("Liste d'animes introuvables");
        }
    }
}

export default GetAnimeListsUseCase;