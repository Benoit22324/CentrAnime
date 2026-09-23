import { sanitizeOpinion } from "../../api/utility";
import UpdateOpinionUseCase from "../../application/usecases/UpdateOpinionUseCase";
import Opinion from "../../domain/entities/Opinion";
import InMemoryOpinionRepository from "../../infrastructure/repositories/InMemoryOpinionRepository";

const op = {
    id: "opinion1",
    note: 9,
    comment: "Bon anime",
    viewStatus: "En cours",
    userId: "user1",
    animeId: "1"
}

describe("UpdateOpinionUseCase", () => {
    let repository: InMemoryOpinionRepository;
    let usecase: UpdateOpinionUseCase;

    beforeEach(() => {
        repository = new InMemoryOpinionRepository();
        usecase = new UpdateOpinionUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with unknown id", async () => {
        await expect(usecase.execute("opinion60", { note: 5 })).rejects.toThrow("Une erreur est survenue");
    })

    it("should return an updated Opinion", async () => {
        const res = await usecase.execute("opinion1", { note: 9, comment: "Bon anime" });

        expect(res).toBeDefined();
        expect(res).toEqual(sanitizeOpinion(op));
        expect(res).toBeInstanceOf(Opinion);
    })
})