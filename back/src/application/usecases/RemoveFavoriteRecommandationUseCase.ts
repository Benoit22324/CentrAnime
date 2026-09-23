import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class RemoveFavoriteRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string): Promise<void> {
        try {
            await this.recommandationRepository.removeFavorite(id);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveFavoriteRecommandationUseCase;