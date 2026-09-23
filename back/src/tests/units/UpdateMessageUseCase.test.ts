import { sanitizeChatMessage } from "../../api/utility";
import UpdateMessageUseCase from "../../application/usecases/UpdateMessageUseCase";
import ChatMessage from "../../domain/entities/ChatMessage";
import InMemoryChatRepository from "../../infrastructure/repositories/InMemoryChatRepository";

const m = {
    id: "message4",
    message: "Fine and u ?",
    authorId: "user2",
    chatId: "chat1",
    createdAt: new Date("09-22-2026")
}

describe("UpdateMessageUseCase", () => {
    let repository: InMemoryChatRepository;
    let usecase: UpdateMessageUseCase;

    beforeEach(() => {
        repository = new InMemoryChatRepository();
        usecase = new UpdateMessageUseCase(repository);
    })

    it("should throw an error 'Le message est requis' with an empty message", async () => {
        await expect(usecase.execute("user2", "message4", "")).rejects.toThrow("Le message est requis");
    })

    it("should throw an error 'Erreur lors de la mise à jour d'un message' with unknown id", async () => {
        await expect(usecase.execute("user2", "message0", "Fine and u ?")).rejects.toThrow("Erreur lors de la mise à jour d'un message");
    })

    it("should return an updated Chat message", async () => {
        const res = await usecase.execute("user2", "message4", "Fine and u ?");

        expect(res).toBeDefined();
        expect(res).toEqual(sanitizeChatMessage(m, "user2"));
        expect(res).toBeInstanceOf(ChatMessage);
    })
})