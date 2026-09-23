import { sanitizeOpinion } from "../../api/utility";
import GetOpinionUseCase from "../../application/usecases/GetOpinionUseCase";
import Opinion from "../../domain/entities/Opinion";
import InMemoryOpinionRepository from "../../infrastructure/repositories/InMemoryOpinionRepository";

const op = sanitizeOpinion({
    id: "opinion1",
    note: 0,
    comment: "",
    viewStatus: "En cours",
    userId: "user1",
    animeId: "1"
})

describe("GetOpinionUseCase", () => {
    let repository: InMemoryOpinionRepository;
    let usecase: GetOpinionUseCase;

    beforeEach(() => {
        repository = new InMemoryOpinionRepository();
        usecase = new GetOpinionUseCase(repository);
    })

    it("should return null with wrong userId and animeId", async () => {
        const res = await usecase.execute("9", "user9");

        expect(res).toBeNull();
    })

    it("should return null with wrong userId", async () => {
        const res = await usecase.execute("1", "user9");

        expect(res).toBeNull();
    })

    it("should return null with wrong animeId", async () => {
        const res = await usecase.execute("9", "user1");

        expect(res).toBeNull();
    })

    it("should return Opinion", async () => {
        const res = await usecase.execute("1", "user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual(op);
            expect(res).toBeInstanceOf(Opinion);
        }
    })
})