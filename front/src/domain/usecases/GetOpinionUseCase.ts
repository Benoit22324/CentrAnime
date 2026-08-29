import type { GetOpinionInput } from "../../interfaces/inputs/GetOpinionInput";
import type { OpinionRepositoryInterface } from "../../interfaces/repositories/OpinionRepositoryInterface";
import type Opinion from "../entities/Opinion";

class GetOpinionUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(input: GetOpinionInput): Promise<Opinion | null> {
        const { animeId } = input;

        try {
            const opinion = await this.opinionRepository.getOpinion(animeId);

            return opinion;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetOpinionUseCase;