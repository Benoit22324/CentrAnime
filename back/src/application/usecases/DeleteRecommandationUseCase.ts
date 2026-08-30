import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class DeleteRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string, userId: string): Promise<void> {
        try {
            await this.recommandationRepository.deleteRecommandation(id, userId);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteRecommandationUseCase;