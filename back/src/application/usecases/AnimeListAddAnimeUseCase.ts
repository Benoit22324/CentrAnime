import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class AddAnimeAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(id: string, animeId: string): Promise<void> {
        try {
            await this.animeListRepository.addAnime(id, animeId);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default AddAnimeAnimeListUseCase;