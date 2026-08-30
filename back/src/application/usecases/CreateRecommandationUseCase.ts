import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class CreateRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(userId: string, title: string, description: string): Promise<void> {
        if (!title) throw new Error("Le titre est requis");
        if (!description) throw new Error("La description est requise");

        try {
            await this.recommandationRepository.createRecommandation(userId, title, description);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateRecommandationUseCase;