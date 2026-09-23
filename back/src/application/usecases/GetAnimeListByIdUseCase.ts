import AnimeList from "../../domain/entities/AnimeList";
import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class GetAnimeListByIdUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(id: string, userId: string): Promise<AnimeList | null> {
        try {
            const aniList = await this.animeListRepository.getAnimeListById(id, userId);

            return aniList;
        } catch (err) {
            throw new Error("Liste d'anime introuvable");
        }
    }
}

export default GetAnimeListByIdUseCase;