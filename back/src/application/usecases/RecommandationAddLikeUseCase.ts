import Recommandation from "../../domain/entities/Recommandation";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class RecommandationAddLikeUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string, userId: string): Promise<Recommandation | null> {
        try {
            const recommandation = await this.recommandationRepository.addLike(id, userId);

            return recommandation;
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RecommandationAddLikeUseCase;