import Contact from "../domain/entities/Contact"

export const convertContact = (contact: any) => {
    return new Contact(
        contact.id,
        contact.contactName,
        contact.chatId
    );
}