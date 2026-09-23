import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class RemoveAnimeAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(id: string): Promise<void> {
        try {
            await this.animeListRepository.removeAnime(id);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveAnimeAnimeListUseCase;