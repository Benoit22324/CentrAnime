import type { CreateRecommandationInput } from "../../interfaces/inputs/CreateRecommandationInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";

class CreateRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: CreateRecommandationInput): Promise<void> {
        const { title, description } = input;

        try {
            await this.recommandationRepository.createRecommandation(title, description);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default CreateRecommandationUseCase;