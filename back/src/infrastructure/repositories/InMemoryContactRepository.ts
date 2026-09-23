import { Contact, Prisma } from "@prisma/client";
import { ContactRepositoryInterface } from "../../domain/interfaces/ContactRepositoryInterface";

type ContactWithUserChat = Prisma.ContactGetPayload<{
    include: {
        userA: {
            select: {
                username: true
            }
        },
        userB: {
            select: {
                username: true
            }
        },
        chat: {
            select: {
                id: true
            }
        }
    }
}>

const c: ContactWithUserChat = {
    id: "contact1",
    userAId: "user1",
    userBId: "user2",
    userA: {
        username: "AnimeFan"
    },
    userB: {
        username: "GoodAnime"
    },
    chat: {
        id: "chat1"
    }
}

class InMemoryContactRepository implements ContactRepositoryInterface {
    async getContactByUsers(userId: string, otherId: string): Promise<Contact | null> {
        if ((userId === c.userAId && otherId === c.userBId) || (otherId === c.userAId && userId === c.userBId)) return c;

        return null;
    }

    async getContacts(userId: string): Promise<Contact[]> {
        if (userId !== "user1") return [];

        return [c];
    }

    async createContact(userId: string, otherId: string): Promise<Contact | null> {
        const contact = {
            ...c,
            userAId: userId,
            userBId: otherId
        }

        return contact;
    }

    async deleteContact(id: string, userId: string): Promise<void> {
        if (id !== "contact1" || userId !== "user1") throw new Error("Une erreur est survenue");
    }
}

export default InMemoryContactRepository;