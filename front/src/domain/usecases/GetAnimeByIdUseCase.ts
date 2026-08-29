import type { GetAnimeByIdInput } from "../../interfaces/inputs/GetAnimeByIdInput";
import type { AnimeRepositoryInterface } from "../../interfaces/repositories/AnimeRepositoryInterface";
import type Anime from "../entities/Anime";

class GetAnimeByIdUseCase {
    constructor(private readonly animeRepository: AnimeRepositoryInterface) { }

    async execute(input: GetAnimeByIdInput): Promise<Anime> {
        const { id } = input;

        try {
            const anime = await this.animeRepository.getAnimeById(id);

            return anime
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetAnimeByIdUseCase;