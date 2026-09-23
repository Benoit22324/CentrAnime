import DeleteContactRequestUseCase from "../../application/usecases/DeleteContactRequestUseCase";
import InMemoryContactRequestRepository from "../../infrastructure/repositories/InMemoryContactRequestRepository";

describe("DeleteContactRequestUseCase", () => {
    let repository: InMemoryContactRequestRepository;
    let usecase: DeleteContactRequestUseCase;

    beforeEach(() => {
        repository = new InMemoryContactRequestRepository();
        usecase = new DeleteContactRequestUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with all wrong", async () => {
        await expect(usecase.execute("cr3", "user3")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong id", async () => {
        await expect(usecase.execute("cr3", "user4")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong userId", async () => {
        await expect(usecase.execute("cr1", "user3")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("cr1", "user4")).resolves.not.toThrow();
    })
})