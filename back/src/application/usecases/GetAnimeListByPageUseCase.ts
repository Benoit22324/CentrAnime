import { GetAnimeListByPageOutputs } from "../../api/dto";
import { AnimeListRepositoryInterface } from "../../domain/interfaces/AnimeListRepositoryInterface";

class GetAnimeListByPageUseCase {
    constructor(private readonly animeListRepository: AnimeListRepositoryInterface) { }

    async execute(selectedPage: number, maxItems: number, userId: string): Promise<GetAnimeListByPageOutputs | null> {
        try {
            const aniLists = await this.animeListRepository.getAnimeListByPage(selectedPage, maxItems, userId);

            return aniLists;
        } catch (err) {
            throw new Error("Liste d'animes introuvables");
        }
    }
}

export default GetAnimeListByPageUseCase;