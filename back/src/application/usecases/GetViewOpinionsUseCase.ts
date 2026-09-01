import { sanitizeOpinion } from "../../api/utility";
import Opinion from "../../domain/entities/Opinion";
import { OpinionRepositoryInterface } from "../../domain/interfaces/OpinionRepositoryInterface";

class GetViewOpinionsUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(userId: string): Promise<Opinion[] | null> {
        try {
            const opinions = await this.opinionRepository.getViewOpinions(userId);

            if (opinions) return opinions.map(opinion => sanitizeOpinion(opinion));

            return null
        } catch (error) {
            throw new Error("Opinion introuvable");
        }
    }
}

export default GetViewOpinionsUseCase;