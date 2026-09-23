import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../entities/Recommandation";

class GetFavoriteRecommandationsUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(): Promise<Recommandation[] | null> {
        try {
            const recommandations = await this.recommandationRepository.getFavoriteRecommandations();

            return recommandations;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetFavoriteRecommandationsUseCase;