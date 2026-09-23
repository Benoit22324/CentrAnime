import type { RemoveFavoriteRecoInput } from "../../interfaces/inputs/RemoveFavoriteRecoInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";

class RemoveFavoriteRecoUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: RemoveFavoriteRecoInput): Promise<void> {
        const { id } = input;

        try {
            await this.recommandationRepository.removeFavoriteReco(id);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveFavoriteRecoUseCase;