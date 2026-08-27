import { Anime } from "@prisma/client";
import { AnimeRepositoryInterface } from "../../domain/interfaces/AnimeRepositoryInterface";

class GetAnimeByIdUseCase {
    constructor(private readonly animeRepository: AnimeRepositoryInterface) { }

    async execute(id: string): Promise<Anime> {
        try {
            const anime = await this.animeRepository.getAnime(id);

            return anime;
        } catch (err) {
            throw new Error("Anime introuvable");
        }
    }
}

export default GetAnimeByIdUseCase;