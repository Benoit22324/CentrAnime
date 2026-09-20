import Chat from "../domain/entities/Chat"
import { convertChatMessage } from "./convertChatMessage";

export const convertChat = (chat: any) => {
    const messages = chat.messages.map((m: any) => convertChatMessage(m));

    return new Chat(
        chat.id,
        messages,
        chat.contactUsername
    );
}