import DeleteContactUseCase from "../../application/usecases/DeleteContactUseCase";
import InMemoryContactRepository from "../../infrastructure/repositories/InMemoryContactRepository";

describe("DeleteContactUseCase", () => {
    let repository: InMemoryContactRepository;
    let usecase: DeleteContactUseCase;

    beforeEach(() => {
        repository = new InMemoryContactRepository();
        usecase = new DeleteContactUseCase(repository);
    })

    it("should throw an error 'Une erreur est survenue' with all wrong", async () => {
        await expect(usecase.execute("contact3", "user3")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong id", async () => {
        await expect(usecase.execute("contact3", "user1")).rejects.toThrow("Une erreur est survenue");
    })

    it("should throw an error 'Une erreur est survenue' with wrong userId", async () => {
        await expect(usecase.execute("contact1", "user3")).rejects.toThrow("Une erreur est survenue");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("contact1", "user1")).resolves.not.toThrow();
    })
})