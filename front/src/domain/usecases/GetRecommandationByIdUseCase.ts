import type { GetRecommandationByIdInput } from "../../interfaces/inputs/GetRecommandationByIdInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../entities/Recommandation";

class GetRecommandationByIdUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: GetRecommandationByIdInput): Promise<Recommandation | null> {
        const { id } = input;

        try {
            const recommandation = await this.recommandationRepository.getRecommandationById(id);

            return recommandation;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetRecommandationByIdUseCase;