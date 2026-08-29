import { AnimeRepositoryInterface } from "../../domain/interfaces/AnimeRepositoryInterface";
import { GetAnimesByPageOutputs } from "../../api/dto";
import { AniListRepositoryInterface } from "../../domain/interfaces/AniListRepositoryInterface";

class GetAnimesByPageUseCase {
    constructor(
        private readonly animeRepository: AnimeRepositoryInterface,
        private readonly aniListRepository: AniListRepositoryInterface
    ) { }

    async execute(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs> {
        try {
            if (searchName || filterGenre) await this.aniListRepository.getApiAnimes(selectedPage, maxItems, searchName, filterGenre);

            const animesDatas = await this.animeRepository.getAnimesByPage(selectedPage, maxItems, searchName, filterGenre);

            if (!animesDatas || animesDatas.animes.length === 0) {
                const animesApiData = await this.aniListRepository.getApiAnimes(selectedPage, maxItems, searchName, filterGenre);

                if (!animesApiData || animesApiData.animes.length === 0) {
                    return {
                        animes: [],
                        total: 0
                    }
                }

                return animesApiData;
            }

            return animesDatas;
        } catch (err) {
            throw new Error("Animes introuvables");
        }
    }
}

export default GetAnimesByPageUseCase;