import type Contact from "../../domain/entities/Contact";

export interface ContactRepositoryInterface {
    getContacts(): Promise<Contact[] | null>
    createContact(requestId: string): Promise<Contact | null>
    deleteContact(contactId: string): Promise<void>
}