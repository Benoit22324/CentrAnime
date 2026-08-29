import { CreateOpinionInputs } from "../../api/dto";
import { sanitizeOpinion } from "../../api/utility";
import Opinion from "../../domain/entities/Opinion";
import { OpinionRepositoryInterface } from "../../domain/interfaces/OpinionRepositoryInterface";

class CreateOpinionUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(animeId: string, userId: string, data: CreateOpinionInputs): Promise<Opinion> {
        try {
            const opinion = await this.opinionRepository.createOpinion(animeId, userId, data);

            return sanitizeOpinion(opinion);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateOpinionUseCase;