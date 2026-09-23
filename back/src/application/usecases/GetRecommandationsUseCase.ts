import Recommandation from "../../domain/entities/Recommandation";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class GetRecommandationsUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(authorId: string): Promise<Recommandation[] | null> {
        try {
            const recommandations = await this.recommandationRepository.getRecommandations(authorId);

            return recommandations;
        } catch (err) {
            throw new Error("Liste de recommandations introuvables");
        }
    }
}

export default GetRecommandationsUseCase;