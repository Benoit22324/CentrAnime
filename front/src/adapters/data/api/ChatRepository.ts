import axios from "axios";
import type { ChatRepositoryInterface } from "../../../interfaces/repositories/ChatRepositoryInterface";
import type Chat from "../../../domain/entities/Chat";
import { convertChat } from "../../../utils/convertChat";
import type ChatMessage from "../../../domain/entities/ChatMessage";
import { convertChatMessage } from "../../../utils/convertChatMessage";
import { apiUrl } from "../../../env";

class ChatRepository implements ChatRepositoryInterface {
    async getChat(chatId: string, contactId: string): Promise<Chat | null> {
        try {
            const response = await axios.get(`${apiUrl}/api/chat?chatId=${chatId}&contactId=${contactId}`, {
                withCredentials: true
            })
            // const response = await axios.get(`/api/chat?chatId=${chatId}&contactId=${contactId}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data || response.data.data.length === 0) return null;

            return convertChat(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async addMessage(chatId: string, message: string): Promise<ChatMessage> {
        try {
            const response = await axios.post(`${apiUrl}/api/chat/message/${chatId}`, { message }, {
                withCredentials: true
            })
            // const response = await axios.post(`/api/chat/message/${chatId}`, { message }, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return convertChatMessage(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async updateMessage(messageId: string, message: string): Promise<ChatMessage> {
        try {
            const response = await axios.patch(`${apiUrl}/api/chat/message/${messageId}`, { message }, {
                withCredentials: true
            })
            // const response = await axios.patch(`/api/chat/message/${messageId}`, { message }, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return convertChatMessage(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async deleteMessage(messageId: string): Promise<void> {
        try {
            const response = await axios.delete(`${apiUrl}/api/chat/message/${messageId}`, {
                withCredentials: true
            })
            // const response = await axios.delete(`/api/chat/message/${messageId}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default ChatRepository;