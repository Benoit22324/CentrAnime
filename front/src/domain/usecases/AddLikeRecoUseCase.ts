import type { AddLikeRecoInput } from "../../interfaces/inputs/AddLikeRecoInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../entities/Recommandation";

class AddLikeRecoUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: AddLikeRecoInput): Promise<Recommandation | null> {
        const { recoId } = input;

        try {
            const recommandation = await this.recommandationRepository.addLikeReco(recoId);

            return recommandation;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AddLikeRecoUseCase;