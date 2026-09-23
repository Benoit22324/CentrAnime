import { Contact } from "@prisma/client";
import { ContactRepositoryInterface } from "../../domain/interfaces/ContactRepositoryInterface";
import { prisma } from "../../api/config/client";

class ContactRepository implements ContactRepositoryInterface {
    async getContactByUsers(userId: string, otherId: string): Promise<Contact | null> {
        const contact = await prisma.contact.findFirst({
            where: {
                OR: [
                    {
                        AND: [
                            {
                                userAId: userId
                            },
                            {
                                userBId: otherId
                            }
                        ]
                    },
                    {
                        AND: [
                            {
                                userAId: otherId
                            },
                            {
                                userBId: userId
                            }
                        ]
                    }
                ]
            }
        });

        return contact;
    }

    async getContacts(userId: string): Promise<Contact[]> {
        const contacts = await prisma.contact.findMany({
            where: {
                OR: [
                    {
                        userAId: userId
                    },
                    {
                        userBId: userId
                    }
                ]
            },
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
        });

        return contacts;
    }

    async createContact(userId: string, otherId: string): Promise<Contact | null> {
        const contact = await prisma.contact.create({
            data: {
                userAId: userId,
                userBId: otherId
            },
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
        });

        return contact;
    }

    async deleteContact(id: string, userId: string): Promise<void> {
        await prisma.contact.delete({
            where: {
                id,
                OR: [
                    {
                        userAId: userId
                    },
                    {
                        userBId: userId
                    }
                ]
            }
        });
    }
}

export default ContactRepository;