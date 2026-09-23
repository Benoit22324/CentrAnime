import { sanitizeContact } from "../../api/utility";
import Contact from "../../domain/entities/Contact";
import { ChatRepositoryInterface } from "../../domain/interfaces/ChatRepositoryInterface";
import { ContactRepositoryInterface } from "../../domain/interfaces/ContactRepositoryInterface";
import { ContactRequestRepositoryInterface } from "../../domain/interfaces/ContactRequestRepositoryInterface";

class CreateContactUseCase {
    constructor(
        private readonly contactRequestRepository: ContactRequestRepositoryInterface,
        private readonly contactRepository: ContactRepositoryInterface,
        private readonly chatRepository: ChatRepositoryInterface
    ) { }

    async execute(requestId: string, userId: string): Promise<Contact | null> {
        const request = await this.contactRequestRepository.getContactRequestById(requestId, userId);

        if (!request) throw new Error("Requête introuvable");

        const isContact = await this.contactRepository.getContactByUsers(request.senderId, userId);

        if (isContact) throw new Error("Vous êtes déjà en contact");

        try {
            await this.contactRequestRepository.deleteContactRequest(requestId, userId);

            const contact = await this.contactRepository.createContact(userId, request.senderId);

            if (contact) {
                const chatId = await this.chatRepository.createChat(contact.id);

                return sanitizeContact(contact, userId, chatId);
            }

            return null;
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateContactUseCase;