import type { RemoveAnimeRecoInput } from "../../interfaces/inputs/RemoveAnimeRecoInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";

class RemoveAnimeRecoUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: RemoveAnimeRecoInput): Promise<void> {
        const { id } = input;

        try {
            await this.recommandationRepository.removeAnimeReco(id);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveAnimeRecoUseCase;