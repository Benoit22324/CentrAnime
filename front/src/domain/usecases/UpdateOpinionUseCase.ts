import type { UpdateOpinionInput } from "../../interfaces/inputs/UpdateOpinionInput";
import type { OpinionRepositoryInterface } from "../../interfaces/repositories/OpinionRepositoryInterface";
import type Opinion from "../entities/Opinion";

class UpdateOpinionUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(input: UpdateOpinionInput): Promise<Opinion> {
        const { id, data } = input;

        try {
            const response = await this.opinionRepository.updateOpinion(id, data);

            return response
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default UpdateOpinionUseCase;