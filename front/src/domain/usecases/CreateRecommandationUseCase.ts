import type { CreateRecommandationInput } from "../../interfaces/inputs/CreateRecommandationInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";

class CreateRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: CreateRecommandationInput): Promise<void> {
        // Déstructuration des données à l'entrée pour s'assurer d'avoir les bons éléments
        const { title, description } = input;

        try {
            // Appel du repository de Recommandation
            await this.recommandationRepository.createRecommandation(title, description);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default CreateRecommandationUseCase;