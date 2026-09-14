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
            // Préparation de la variable qui stocke les animes de l'API
            let animesApiData: GetAnimesByPageOutputs | null | undefined;

            // S'il y a une rechercher via le Nom ou le Genre des animes, on fait une appel API pour mettre à jour la bdd
            if (searchName || filterGenre) animesApiData = await this.apiAniListRepository.getApiAnimes(selectedPage, maxItems, searchName, filterGenre);

            // Récupération des animes en bdd
            const animesDatas = await this.animeRepository.getAnimesByPage(selectedPage, maxItems, searchName, filterGenre);

            // On retourne les animes de la bdd s'il y en a
            if (animesDatas && animesDatas.animes.length > 0) return animesDatas;

            // Sinon, on retourne les animes de l'API s'il y en a qu'on a récupéré lors de la recherche
            if (animesApiData && (searchName || filterGenre)) return animesApiData;
            // Si on n'a pas fait de recherche et qu'on n'a pas encore de donnée, on fait une recherche à l'API
            else if (!animesApiData && !searchName && !filterGenre) {
                const apiData = await this.apiAniListRepository.getApiAnimes(selectedPage, maxItems, searchName, filterGenre);

                // On retourne les données s'il y en a
                if (apiData) return apiData
            }

            // Si aucune donnée n'est trouvé, on retourne une valeur par défaut
            return {
                animes: [],
                total: 0
            }
        } catch (err) {
            throw new Error("Animes introuvables");
        }
    }
}

export default GetAnimesByPageUseCase;