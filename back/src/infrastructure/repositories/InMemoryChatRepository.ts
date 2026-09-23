import { Chat, ChatMessage, Prisma } from "@prisma/client";
import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface";

type ChatWithMessageContact = Prisma.ChatGetPayload<{
    include: {
        chatMessages: {
            select: {
                id: true,
                message: true,
                author: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        },
        contact: {
            select: {
                userA: {
                    select: {
                        id: true,
                        username: true
                    }
                },
                userB: {
                    select: {
                        id: true,
                        username: true
                    }
                }
            }
        }
    }
}>

const c: ChatWithMessageContact = {
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
}

const m: ChatMessage = {
    id: "message4",
    message: "Fine",
    authorId: "user2",
    chatId: "chat1",
    createdAt: new Date("09-22-2026")
}

class InMemoryChatRepository implements ChatRepositoryInterface {
    async getChat(id: string, contactId: string): Promise<Chat | null> {
        if (id === "chat1" && contactId === "contact1") return c;

        return null;
    }

    async chatExist(id: string): Promise<boolean> {
        if (c.id !== id) return false;

        return true;
    }

    async createChat(contactId: string): Promise<string> {
        return c.id;
    }

    async addMessage(authorId: string, chatId: string, message: string): Promise<ChatMessage> {
        if (chatId !== "chat1") throw new Error("Une erreur est survenue");

        const chatMessage = {
            id: "message4",
            message,
            authorId,
            chatId,
            createdAt: new Date("09-22-2026")
        }

        return chatMessage;
    }

    async updateMessage(authorId: string, messageId: string, message: string): Promise<ChatMessage> {
        if (authorId !== "user2" || messageId !== "message4") throw new Error("Une erreur est survenue");

        const chatMessage = {
            ...m,
            message
        }

        return chatMessage
    }

    async deleteMessage(authorId: string, messageId: string): Promise<void> {
        if ((messageId !== "message1" && messageId !== "message2" && messageId !== "message3" && messageId !== "message4") || (authorId !== "user1" && authorId !== "user2")) throw new Error("Une erreur est survenue");
    }
}

export default InMemoryChatRepository;