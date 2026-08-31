import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class RemoveLikeRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string): Promise<void> {
        try {
            await this.recommandationRepository.removeLike(id);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveLikeRecommandationUseCase;