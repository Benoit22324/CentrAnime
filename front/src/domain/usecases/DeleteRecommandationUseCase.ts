import type { DeleteRecommandationInput } from "../../interfaces/inputs/DeleteRecommandationInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";

class DeleteRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: DeleteRecommandationInput): Promise<void> {
        const { id } = input;

        try {
            await this.recommandationRepository.deleteRecommandation(id);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteRecommandationUseCase;