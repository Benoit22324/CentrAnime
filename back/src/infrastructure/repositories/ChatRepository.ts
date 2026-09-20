import { Chat, ChatMessage } from "@prisma/client";
import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface";
import { prisma } from "../../api/config/client";

class ChatRepository implements ChatRepositoryInterface {
    async getChat(id: string, contactId: string): Promise<Chat | null> {
        const chat = await prisma.chat.findUnique({
            where: {
                id,
                contactId
            },
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
                        createdAt: "asc"
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
        });

        return chat;
    }

    async chatExist(id: string): Promise<boolean> {
        const chat = await prisma.chat.findUnique({
            where: { id }
        });

        return chat !== null;
    }

    async createChat(contactId: string): Promise<string> {
        const chat = await prisma.chat.create({
            data: {
                contactId
            }
        });

        return chat.id;
    }

    async addMessage(authorId: string, chatId: string, message: string): Promise<ChatMessage> {
        const chatMessage = await prisma.chatMessage.create({
            data: {
                authorId,
                chatId,
                message
            },
            include: {
                author: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return chatMessage;
    }

    async updateMessage(authorId: string, messageId: string, message: string): Promise<ChatMessage> {
        const chatMessage = await prisma.chatMessage.update({
            where: {
                id: messageId,
                authorId
            },
            data: {
                message
            },
            include: {
                author: {
                    select: {
                        id: true
                    }
                }
            }
        });

        return chatMessage
    }

    async deleteMessage(authorId: string, messageId: string): Promise<void> {
        await prisma.chatMessage.delete({
            where: {
                id: messageId,
                authorId
            }
        });
    }
}

export default ChatRepository;