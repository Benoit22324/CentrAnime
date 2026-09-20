import type Chat from "../../domain/entities/Chat";
import type ChatMessage from "../../domain/entities/ChatMessage";

export interface ChatRepositoryInterface {
    getChat(chatId: string, contactId: string): Promise<Chat | null>
    addMessage(chatId: string, message: string): Promise<ChatMessage>
    updateMessage(messageId: string, message: string): Promise<ChatMessage>
    deleteMessage(messageId: string): Promise<void>
}