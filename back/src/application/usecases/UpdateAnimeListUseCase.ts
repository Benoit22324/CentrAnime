import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class UpdateAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(id: string, title: string): Promise<void> {
        if (!title) throw new Error("Le titre est requis");

        try {
            await this.animeListRepository.updateAnimeList(id, title);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateAnimeListUseCase;