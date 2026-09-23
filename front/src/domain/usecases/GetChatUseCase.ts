import type { GetChatInput } from "../../interfaces/inputs/GetChatInput";
import type { ChatRepositoryInterface } from "../../interfaces/repositories/ChatRepositoryInterface";
import type Chat from "../entities/Chat";

class GetChatUseCase {
    constructor(private readonly chatRepository: ChatRepositoryInterface) { }

    async execute(input: GetChatInput): Promise<Chat | null> {
        const { chatId, contactId } = input;

        try {
            const chat = await this.chatRepository.getChat(chatId, contactId);

            return chat;
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default GetChatUseCase;