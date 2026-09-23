import { sanitizeChatMessage } from "../../api/utility";
import AddMessageUseCase from "../../application/usecases/AddMessageUseCase";
import ChatMessage from "../../domain/entities/ChatMessage";
import InMemoryChatRepository from "../../infrastructure/repositories/InMemoryChatRepository";

const newMessage = sanitizeChatMessage({
    id: "message4",
    message: "Fine",
    authorId: "user1",
    chatId: "chat1",
    createdAt: new Date("09-22-2026")
}, "user1")

describe("AddMessageUseCase", () => {
    let repository: InMemoryChatRepository;
    let usecase: AddMessageUseCase;

    beforeEach(() => {
        repository = new InMemoryChatRepository();
        usecase = new AddMessageUseCase(repository);
    })

    it("should throw an error 'Le chat n'existe pas'", async () => {
        await expect(usecase.execute("user1", "chat20", "Fine")).rejects.toThrow("Le chat n'existe pas");
    })

    it("should throw an error 'Le message est requis'", async () => {
        await expect(usecase.execute("user1", "chat1", " ")).rejects.toThrow("Le message est requis");
    })

    it("should return new message", async () => {
        const result = await usecase.execute("user1", "chat1", "Fine")

        expect(result).toBeDefined();
        expect(result).toBeInstanceOf(ChatMessage);
        expect(result).toEqual(newMessage);
    })
})