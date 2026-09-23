import type { UpdateRecommandationInput } from "../../interfaces/inputs/UpdateRecommandationInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../entities/Recommandation";

class UpdateRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: UpdateRecommandationInput): Promise<Recommandation | null> {
        const { id, title, description } = input;

        try {
            const recommandation = await this.recommandationRepository.updateRecommandation(id, title, description);

            return recommandation;
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateRecommandationUseCase;