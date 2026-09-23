import type { UpdateMessageInput } from "../../interfaces/inputs/UpdateMessageInput";
import type { ChatRepositoryInterface } from "../../interfaces/repositories/ChatRepositoryInterface";
import type ChatMessage from "../entities/ChatMessage";

class UpdateMessageUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(input: UpdateMessageInput): Promise<ChatMessage> {
        const { messageId, message } = input;

        try {
            const msg = await this.chatRepository.updateMessage(messageId, message);

            return msg;
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateMessageUseCase;