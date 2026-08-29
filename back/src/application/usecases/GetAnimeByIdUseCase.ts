import { sanitizeAnime } from "../../api/utility";
import Anime from "../../domain/entities/Anime";
import { AnimeRepositoryInterface } from "../../domain/interfaces/AnimeRepositoryInterface";

class GetAnimeByIdUseCase {
    constructor(private readonly animeRepository: AnimeRepositoryInterface) { }

    async execute(id: string): Promise<Anime> {
        try {
            const anime = await this.animeRepository.getAnime(id);

            return sanitizeAnime(anime);
        } catch (err) {
            throw new Error("Anime introuvable");
        }
    }
}

export default GetAnimeByIdUseCase;