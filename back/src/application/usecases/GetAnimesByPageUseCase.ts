import { AnimeRepositoryInterface } from "../../domain/interfaces/AnimeRepositoryInterface";
import { GetAnimesByPageOutputs } from "../../api/dto";
import { ApiAniListRepositoryInterface } from "../../domain/interfaces/ApiAniListRepositoryInterface";

class GetAnimesByPageUseCase {
    constructor(
        private readonly animeRepository: AnimeRepositoryInterface,
        private readonly apiAniListRepository: ApiAniListRepositoryInterface
    ) { }

    async execute(selectedPage: number, maxItems: number, searchName: string | null, filterGenre: string | null): Promise<GetAnimesByPageOutputs> {
        try {
            // S'il y a une rechercher via le Nom ou le Genre des animes, on fait une appel API pour mettre à jour la bdd
            if (searchName || filterGenre) await this.apiAniListRepository.getApiAnimes(selectedPage, maxItems, searchName, filterGenre);

            // Récupération des animes en bdd
            const animesDatas = await this.animeRepository.getAnimesByPage(selectedPage, maxItems, searchName, filterGenre);

            // S'il n'y a pas d'animes, on appel l'API
            if (!animesDatas || animesDatas.animes.length === 0) {
                const animesApiData = await this.apiAniListRepository.getApiAnimes(selectedPage, maxItems, searchName, filterGenre);

                // Si on n'a pas de donnée récupéré de l'API, on retourne une valeur par défaut
                if (!animesApiData || animesApiData.animes.length === 0) {
                    return {
                        animes: [],
                        total: 0
                    }
                }

                // On retourne les animes de l'API
                return animesApiData;
            }

            // On retourne les animes de la bdd
            return animesDatas;
        } catch (err) {
            throw new Error("Animes introuvables");
        }
    }
}

export default GetAnimesByPageUseCase;