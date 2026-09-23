class ContactRequest {
    constructor(
        private readonly id: string,
        private readonly senderName: string,
        private readonly createdAt: Date,
    ) { }

    getId() {
        return this.id;
    }

    getSenderName() {
        return this.senderName;
    }

    getCreatedAt() {
        return this.createdAt;
    }
}

export default ContactRequest;