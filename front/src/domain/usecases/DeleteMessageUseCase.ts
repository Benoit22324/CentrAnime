import type { DeleteMessageInput } from "../../interfaces/inputs/DeleteMessageInput";
import type { ChatRepositoryInterface } from "../../interfaces/repositories/ChatRepositoryInterface";

class DeleteMessageUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(input: DeleteMessageInput): Promise<void> {
        const { messageId } = input;

        try {
            await this.chatRepository.deleteMessage(messageId);
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteMessageUseCase;