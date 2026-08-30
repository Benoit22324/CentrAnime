import { GetRecommandationByPageOutputs } from "../../api/dto";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class GetRecommandationByPageUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(selectedPage: number, maxItems: number): Promise<GetRecommandationByPageOutputs | null> {
        try {
            const recommandations = await this.recommandationRepository.getRecommandationByPage(selectedPage, maxItems);

            return recommandations;
        } catch (err) {
            throw new Error("Liste de recommandations introuvables");
        }
    }
}

export default GetRecommandationByPageUseCase;