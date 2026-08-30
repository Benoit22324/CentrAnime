import Recommandation from "../../domain/entities/Recommandation";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class GetRecommandationByIdUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string, authorId: string): Promise<Recommandation | null> {
        try {
            const recommandation = await this.recommandationRepository.getRecommandationById(id, authorId);

            return recommandation;
        } catch (err) {
            throw new Error("Recommandation introuvable");
        }
    }
}

export default GetRecommandationByIdUseCase;