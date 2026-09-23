import type { AddAnimeRecoInput } from "../../interfaces/inputs/AddAnimeRecoInput";
import type { RecommandationRepositoryInterface } from "../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../entities/Recommandation";

class AddAnimeRecoUseCase {
    constructor(private readonly recommandationRepository: RecommandationRepositoryInterface) { }

    async execute(input: AddAnimeRecoInput): Promise<Recommandation | null> {
        const { recoId, animeId } = input;

        try {
            const recommandation = await this.recommandationRepository.addAnimeReco(recoId, animeId);

            return recommandation;
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AddAnimeRecoUseCase;