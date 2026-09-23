import { ContactRequest, Prisma } from "@prisma/client";
import { ContactRequestRepositoryInterface } from "../../domain/interfaces/ContactRequestRepositoryInterface";

type ContactRequestWithSender = Prisma.ContactRequestGetPayload<{
    include: {
        sender: {
            select: {
                username: true
            }
        }
    }
}>

const cr: ContactRequestWithSender = {
    id: "cr1",
    senderId: "user1",
    receiverId: "user4",
    createdAt: new Date("09-20-2026"),
    sender: {
        username: "AnimeFan"
    }
}

class InMemoryContactRequestRepository implements ContactRequestRepositoryInterface {
    async getContactRequestById(id: string, userId: string): Promise<ContactRequest | null> {
        if (id === "cr1" && userId === "user4") return cr;

        return null;
    }

    async getContactRequestByUser(userId: string): Promise<ContactRequest | null> {
        if (userId === cr.receiverId || userId === cr.senderId) return cr;

        return null;
    }

    async getContactRequests(userId: string): Promise<ContactRequest[]> {
        if (userId !== "user2") return [];

        return [cr];
    }

    async createContactRequest(senderId: string, receiverId: string): Promise<void> {}

    async deleteContactRequest(id: string, userId: string): Promise<void> {
        if (id !== "cr1" || userId !== cr.receiverId) throw new Error("Une erreur est survenue");
    }
}

export default InMemoryContactRequestRepository;