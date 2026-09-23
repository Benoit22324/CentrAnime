import Recommandation from "../../domain/entities/Recommandation";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class GetFavoriteRecommandationsUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(userId: string): Promise<Recommandation[]> {
        try {
            const recommandations = await this.recommandationRepository.getFavoriteRecommandations(userId);

            return recommandations;
        } catch (err) {
            throw new Error("Liste de recommandations favoris introuvables");
        }
    }
}

export default GetFavoriteRecommandationsUseCase;