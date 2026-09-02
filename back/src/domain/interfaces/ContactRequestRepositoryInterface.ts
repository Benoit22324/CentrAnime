import { ContactRequest } from "@prisma/client";

export interface ContactRequestRepositoryInterface {
    getContactRequestById(id: string, userId: string): Promise<ContactRequest | null>
    getContactRequests(userId: string): Promise<ContactRequest[]>
    createContactRequest(senderId: string, receiverId: string): Promise<void>
    deleteContactRequest(id: string, userId: string): Promise<void>
}