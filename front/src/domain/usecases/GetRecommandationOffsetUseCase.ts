import type { GetRecommandationOffsetInput } from "../../interfaces/inputs/GetRecommandationOffsetInput";
import type { GetRecommandationOffsetOutput } from "../../interfaces/outputs/GetRecommandationOffsetOutput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";

class GetRecommandationOffsetUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: GetRecommandationOffsetInput): Promise<GetRecommandationOffsetOutput> {
        const { selectedPage, maxItems } = input;

        try {
            const recommandations = await this.recommandationRepository.getRecommandationOffset(selectedPage, maxItems);

            return recommandations;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetRecommandationOffsetUseCase;