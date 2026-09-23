import { sanitizeChat } from "../../api/utility";
import Chat from "../../domain/entities/Chat";
import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface";

class GetChatUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(id: string, contactId: string, userId: string): Promise<Chat | null> {
        try {
            const chat = await this.chatRepository.getChat(id, contactId);

            if (chat) return sanitizeChat(chat, userId);

            return null;
        } catch (error) {
            throw new Error("Chat introuvable");
        }
    }
}

export default GetChatUseCase;