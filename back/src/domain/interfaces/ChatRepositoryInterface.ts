import { Chat, ChatMessage } from "@prisma/client";

export interface ChatRepositoryInterface {
    getChat(id: string, contactId: string): Promise<Chat | null>
    chatExist(id: string): Promise<boolean>
    createChat(contactId: string): Promise<string>
    addMessage(authorId: string, chatId: string, message: string): Promise<ChatMessage>
    updateMessage(authorId: string, messageId: string, message: string): Promise<ChatMessage>
    deleteMessage(authorId: string, messageId: string): Promise<void>
}