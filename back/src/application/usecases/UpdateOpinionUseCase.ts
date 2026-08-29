import { CreateOpinionInputs } from "../../api/dto";
import { sanitizeOpinion } from "../../api/utility";
import Opinion from "../../domain/entities/Opinion";
import { OpinionRepositoryInterface } from "../../domain/interfaces/OpinionRepositoryInterface";

class UpdateOpinionUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(id: string, data: CreateOpinionInputs): Promise<Opinion> {
        try {
            const opinion = await this.opinionRepository.updateOpinion(id, data);

            return sanitizeOpinion(opinion);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateOpinionUseCase;