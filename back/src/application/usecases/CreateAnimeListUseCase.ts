import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class CreateAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(userId: string, title: string): Promise<void> {
        if (!title) throw new Error("Le titre est requis");

        try {
            await this.animeListRepository.createAnimeList(userId, title);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateAnimeListUseCase;