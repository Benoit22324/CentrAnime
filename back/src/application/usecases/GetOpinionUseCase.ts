import { sanitizeOpinion } from "../../api/utility";
import Opinion from "../../domain/entities/Opinion";
import { OpinionRepositoryInterface } from "../../domain/interfaces/OpinionRepositoryInterface";

class GetOpinionUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(animeId: string, userId: string): Promise<Opinion | null> {
        try {
            const opinion = await this.opinionRepository.getOpinion(animeId, userId);

            if (opinion) return sanitizeOpinion(opinion);

            return null
        } catch (error) {
            throw new Error("Opinion introuvable");
        }
    }
}

export default GetOpinionUseCase;