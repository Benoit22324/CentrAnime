import type ContactRequest from "../../domain/entities/ContactRequest";

export interface ContactRequestRepositoryInterface {
    getContactRequests(): Promise<ContactRequest[] | null>
    createContactRequest(email: string): Promise<string | void>
    deleteContactRequest(requestId: string): Promise<void>
}