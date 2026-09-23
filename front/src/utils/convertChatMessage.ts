import ChatMessage from "../domain/entities/ChatMessage"

export const convertChatMessage = (cm: any) => {
    return new ChatMessage(
        cm.id,
        cm.message,
        cm.isOwner
    );
}