import Recommandation from "../../domain/entities/Recommandation";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class UpdateRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(id: string, title: string, description: string): Promise<Recommandation> {
        if (!title) throw new Error("Le titre est requis");
        if (!description) throw new Error("La description est requise");

        try {
            const anilist = await this.recommandationRepository.updateRecommandation(id, title, description);

            return anilist;
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateRecommandationUseCase;