import type { OpinionRepositoryInterface } from "../../interfaces/repositories/OpinionRepositoryInterface";
import type Opinion from "../entities/Opinion";

class GetViewOpinionUseCase {
    constructor(private readonly opinionRepository: OpinionRepositoryInterface) { }

    async execute(): Promise<Opinion[] | null> {
        try {
            const opinions = await this.opinionRepository.getViewOpinion();

            return opinions;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetViewOpinionUseCase;