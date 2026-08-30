import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class RemoveAnimeRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string): Promise<void> {
        try {
            await this.recommandationRepository.removeAnime(id);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RemoveAnimeRecommandationUseCase;