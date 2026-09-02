import { ContactRequest } from "@prisma/client";
import { ContactRequestRepositoryInterface } from "../../domain/interfaces/ContactRequestRepositoryInterface";
import { prisma } from "../../api/config/client";

class ContactRequestRepository implements ContactRequestRepositoryInterface {
    async getContactRequestById(id: string, userId: string): Promise<ContactRequest | null> {
        const contactRequest = await prisma.contactRequest.findUnique({
            where: {
                id,
                receiverId: userId
            }
        });

        return contactRequest;
    }

    async getContactRequests(userId: string): Promise<ContactRequest[]> {
        const contactRequests = await prisma.contactRequest.findMany({
            where: {
                receiverId: userId
            },
            include: {
                sender: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return contactRequests;
    }

    async createContactRequest(senderId: string, receiverId: string): Promise<void> {
        await prisma.contactRequest.create({
            data: {
                senderId,
                receiverId
            }
        });
    }

    async deleteContactRequest(id: string, userId: string): Promise<void> {
        await prisma.contactRequest.delete({
            where: {
                id,
                receiverId: userId
            }
        });
    }
}

export default ContactRequestRepository;