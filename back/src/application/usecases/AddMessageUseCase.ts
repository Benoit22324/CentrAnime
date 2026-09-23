import { sanitizeChatMessage } from "../../api/utility";
import ChatMessage from "../../domain/entities/ChatMessage";
import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface";

class AddMessageUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(userId: string, chatId: string, message: string): Promise<ChatMessage> {
        if (!message || message.trim() === "") throw new Error("Le message est requis");

        const chat = await this.chatRepository.chatExist(chatId);

        if (!chat) throw new Error("Le chat n'existe pas");

        try {
            const cm = await this.chatRepository.addMessage(userId, chatId, message);

            return sanitizeChatMessage(cm, userId);
        } catch (error) {
            throw new Error("Erreur lors de l'ajout d'un nouveau message");
        }
    }
}

export default AddMessageUseCase;