import type { AddFavoriteRecoInput } from "../../interfaces/inputs/AddFavoriteRecoInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../entities/Recommandation";

class AddFavoriteRecoUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: AddFavoriteRecoInput): Promise<Recommandation | null> {
        const { recoId } = input;

        try {
            const recommandation = await this.recommandationRepository.addFavoriteReco(recoId);

            return recommandation;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AddFavoriteRecoUseCase;