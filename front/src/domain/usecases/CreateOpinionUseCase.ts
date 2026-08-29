import type { CreateOpinionInput } from "../../interfaces/inputs/CreateOpinionInput";
import type { OpinionRepositoryInterface } from "../../interfaces/repositories/OpinionRepositoryInterface";
import type Opinion from "../entities/Opinion";

class CreateOpinionUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(input: CreateOpinionInput): Promise<Opinion> {
        const { animeId, data } = input;

        try {
            const response = await this.opinionRepository.createOpinion(animeId, data);

            return response
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default CreateOpinionUseCase;