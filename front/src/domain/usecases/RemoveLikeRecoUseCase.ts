import type { RemoveLikeRecoInput } from "../../interfaces/inputs/RemoveLikeRecoInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";

class RemoveLikeRecoUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: RemoveLikeRecoInput): Promise<void> {
        const { id } = input;

        try {
            await this.recommandationRepository.removeLikeReco(id);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveLikeRecoUseCase;