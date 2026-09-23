import { sanitizeChatMessage } from "../../api/utility";
import ChatMessage from "../../domain/entities/ChatMessage";
import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface";

class UpdateMessageUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(userId: string, messageId: string, message: string): Promise<ChatMessage> {
        if (!message || message.trim() === "") throw new Error("Le message est requis");

        try {
            const cm = await this.chatRepository.updateMessage(userId, messageId, message);

            return sanitizeChatMessage(cm, userId);
        } catch (error) {
            throw new Error("Erreur lors de la mise à jour d'un message");
        }
    }
}

export default UpdateMessageUseCase;