import { Contact } from "@prisma/client";

export interface ContactRepositoryInterface {
    getContactByUsers(userId: string, otherId: string): Promise<Contact | null>
    getContacts(userId: string): Promise<Contact[]>
    createContact(userId: string, otherId: string): Promise<Contact | null>
    deleteContact(id: string, userId: string): Promise<void>
}