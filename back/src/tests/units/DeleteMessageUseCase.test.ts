import DeleteMessageUseCase from "../../application/usecases/DeleteMessageUseCase";
import InMemoryChatRepository from "../../infrastructure/repositories/InMemoryChatRepository";

describe("DeleteMessageUseCase", () => {
    let repository: InMemoryChatRepository;
    let usecase: DeleteMessageUseCase;

    beforeEach(() => {
        repository = new InMemoryChatRepository();
        usecase = new DeleteMessageUseCase(repository);
    })

    it("should throw an error 'Erreur lors de la suppression d'un message' with all wrong", async () => {
        await expect(usecase.execute("user3", "message9")).rejects.toThrow("Erreur lors de la suppression d'un message");
    })

    it("should throw an error 'Erreur lors de la suppression d'un message' with wrong messageId", async () => {
        await expect(usecase.execute("user1", "message9")).rejects.toThrow("Erreur lors de la suppression d'un message");
    })

    it("should throw an error 'Erreur lors de la suppression d'un message' with wrong userId", async () => {
        await expect(usecase.execute("user3", "message1")).rejects.toThrow("Erreur lors de la suppression d'un message");
    })

    it("should resolve", async () => {
        await expect(usecase.execute("user1", "message1")).resolves.not.toThrow();
    })
})