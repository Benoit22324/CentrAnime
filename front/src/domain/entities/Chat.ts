import type ChatMessage from "./ChatMessage";

class Chat {
    constructor(
        private readonly id: string,
        private readonly messages: ChatMessage[],
        private readonly contactUsername: string
    ) { }

    getId() {
        return this.id;
    }

    getMessages() {
        return this.messages;
    }

    getContactUsername() {
        return this.contactUsername;
    }
}

export default Chat;