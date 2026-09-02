import ContactRequest from "../domain/entities/ContactRequest"

export const convertContactRequest = (contactRequest: any) => {
    return new ContactRequest(
        contactRequest.id,
        contactRequest.senderName,
        contactRequest.createdAt
    )
}