import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";

class CreateRecommandationUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(userId: string, title: string, description: string): Promise<void> {
        // Vérification si les champs saisies ne sont pas vide
        if (!title) throw new Error("Le titre est requis");
        if (!description) throw new Error("La description est requise");

        try {
            // Création de la recommandation en bdd
            await this.recommandationRepository.createRecommandation(userId, title, description);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateRecommandationUseCase;