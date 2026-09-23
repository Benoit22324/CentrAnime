import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface";

class DeleteMessageUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(userId: string, messageId: string): Promise<void> {
        try {
            await this.chatRepository.deleteMessage(userId, messageId);
        } catch (error) {
            throw new Error("Erreur lors de la suppression d'un message");
        }
    }
}

export default DeleteMessageUseCase;