import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../entities/Recommandation";

class GetRecommandationsUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(): Promise<Recommandation[] | null> {
        try {
            const recommandations = await this.recommandationRepository.getRecommandations();

            return recommandations;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetRecommandationsUseCase;