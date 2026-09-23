import { sanitizeOpinion } from "../../api/utility";
import CreateOpinionUseCase from "../../application/usecases/CreateOpinionUseCase";
import Opinion from "../../domain/entities/Opinion";
import InMemoryOpinionRepository from "../../infrastructure/repositories/InMemoryOpinionRepository";

const newOpinion = {
    id: "opinion2",
    viewStatus: "En cours",
    note: 8.5,
    comment: "Bien aimé",
    animeId: "ani1",
    userId: "user1"
}

describe("CreateOpinionUseCase", () => {
    let repository: InMemoryOpinionRepository;
    let usecase: CreateOpinionUseCase;

    beforeEach(() => {
        repository = new InMemoryOpinionRepository();
        usecase = new CreateOpinionUseCase(repository);
    })

    it("should return new Opinion with only comment", async () => {
        const res = await usecase.execute("ani1", "user1", { comment: "Bien aimé" });

        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Opinion);
        expect(res).toEqual(sanitizeOpinion({...newOpinion, viewStatus: "", note: 0}))
    })

    it("should return new Opinion with only note", async () => {
        const res = await usecase.execute("ani1", "user1", { note: 8.5 });

        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Opinion);
        expect(res).toEqual(sanitizeOpinion({...newOpinion, viewStatus: "", comment: ""}))
    })

    it("should return new Opinion with only viewStatus", async () => {
        const res = await usecase.execute("ani1", "user1", { viewStatus: "En cours" });

        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Opinion);
        expect(res).toEqual(sanitizeOpinion({...newOpinion, comment: "", note: 0}))
    })

    it("should return new Opinion with all data defined", async () => {
        const res = await usecase.execute("ani1", "user1", {
            viewStatus: "En cours",
            comment: "Bien aimé",
            note: 8.5
        });

        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Opinion);
        expect(res).toEqual(sanitizeOpinion(newOpinion))
    })
})