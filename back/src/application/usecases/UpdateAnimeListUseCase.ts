import AnimeList from "../../domain/entities/AnimeList";
import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class UpdateAnimeListUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(id: string, title: string): Promise<AnimeList> {
        if (!title) throw new Error("Le titre est requis");

        try {
            const anilist = await this.animeListRepository.updateAnimeList(id, title);

            return anilist;
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateAnimeListUseCase;