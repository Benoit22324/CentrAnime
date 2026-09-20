import type { AddMessageInput } from "../../interfaces/inputs/AddMessageInput";
import type { ChatRepositoryInterface } from "../../interfaces/repositories/ChatRepositoryInterface";
import type ChatMessage from "../entities/ChatMessage";

class AddMessageUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(input: AddMessageInput): Promise<ChatMessage> {
        const { chatId, message } = input;

        try {
            const msg = await this.chatRepository.addMessage(chatId, message);

            return msg;
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default AddMessageUseCase;