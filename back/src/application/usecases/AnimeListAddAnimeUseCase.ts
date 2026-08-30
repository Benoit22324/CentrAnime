import AnimeList from "../../domain/entities/AnimeList";
import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class AnimeListAddAnimeUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(id: string, animeId: string): Promise<AnimeList | null> {
        try {
            const anilist = await this.animeListRepository.addAnime(id, animeId);

            return anilist;
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default AnimeListAddAnimeUseCase;