class ChatMessage {
    constructor(
        private readonly id: string,
        private readonly message: string,
        private readonly isOwner: boolean
    ) { }

    getId() {
        return this.id;
    }

    getMessage() {
        return this.message;
    }

    getIsOwner() {
        return this.isOwner;
    }
}

export default ChatMessage;