import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class DeleteAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(id: string, userId: string): Promise<void> {
        try {
            await this.animeListRepository.deleteAnimeList(id, userId);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteAnimeListUseCase;