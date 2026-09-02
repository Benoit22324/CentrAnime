class Contact {
    constructor(
        private readonly id: string,
        private readonly contactName: string,
        private readonly chatId: string
    ) { }

    getId() {
        return this.id;
    }

    getContactName() {
        return this.contactName;
    }

    getChatId() {
        return this.chatId;
    }
}

export default Contact;