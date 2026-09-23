import { Chat as PrismaChat } from "@prisma/client";
import { sanitizeChat } from "../../api/utility";
import GetChatUseCase from "../../application/usecases/GetChatUseCase";
import InMemoryChatRepository from "../../infrastructure/repositories/InMemoryChatRepository";
import Chat from "../../domain/entities/Chat";

const chat = sanitizeChat({
    id: "chat1",
    contactId: "contact1",
    chatMessages: [
        {
            id: "message1",
            message: "Hello World",
            author: {
                id: "user1",
                username: "AnimeFan"
            }
        },
        {
            id: "message2",
            message: "Hello",
            author: {
                id: "user2",
                username: "GoodAnime"
            }
        },
        {
            id: "message3",
            message: "How are you ?",
            author: {
                id: "user1",
                username: "AnimeFan"
            }
        }
    ],
    contact: {
        userA: {
            id: "user1",
            username: "AnimeFan"
        },
        userB: {
            id: "user2",
            username: "GoodAnime"
        }
    }
} as PrismaChat, "user1")

describe("GetChatUseCase", () => {
    let repository: InMemoryChatRepository;
    let usecase: GetChatUseCase;

    beforeEach(() => {
        repository = new InMemoryChatRepository();
        usecase = new GetChatUseCase(repository);
    })

    it("should return null with wrong chatId and contactId", async () => {
        const res = await usecase.execute("chat2", "contact4", "user1");

        expect(res).toBeNull();
    })

    it("should return null with wrong contactId", async () => {
        const res = await usecase.execute("chat1", "contact4", "user1");

        expect(res).toBeNull();
    })

    it("should return null with wrong chatId", async () => {
        const res = await usecase.execute("chat2", "contact1", "user1");

        expect(res).toBeNull();
    })

    it("should return chat", async () => {
        const res = await usecase.execute("chat1", "contact1", "user1");

        expect(res).toBeDefined();
        expect(res).toEqual(chat);
        expect(res).toBeInstanceOf(Chat);
    })
})