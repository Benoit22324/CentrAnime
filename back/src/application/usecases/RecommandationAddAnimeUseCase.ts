import Recommandation from "../../domain/entities/Recommandation";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class RecommandationAddAnimeUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string, animeId: string): Promise<Recommandation | null> {
        try {
            const recommandation = await this.recommandationRepository.addAnime(id, animeId);

            return recommandation;
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RecommandationAddAnimeUseCase;