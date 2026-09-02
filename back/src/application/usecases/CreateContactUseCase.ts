import { sanitizeContact } from "../../api/utility";
import Contact from "../../domain/entities/Contact";
import { ContactRepositoryInterface } from "../../domain/interfaces/ContactRepositoryInterface";
import { ContactRequestRepositoryInterface } from "../../domain/interfaces/ContactRequestRepositoryInterface";

class CreateContactUseCase {
    constructor(
        private readonly contactRequestRepository: ContactRequestRepositoryInterface,
        private readonly contactRepository: ContactRepositoryInterface
    ) { }

    async execute(requestId: string, userId: string): Promise<Contact | null> {
        const request = await this.contactRequestRepository.getContactRequestById(requestId, userId);

        if (!request) throw new Error("Requête introuvable");

        const isContact = await this.contactRepository.getContactByUsers(request.senderId, userId);

        if (isContact) throw new Error("Vous êtes déjà en contact");

        try {
            await this.contactRequestRepository.deleteContactRequest(requestId, userId);

            const contact = await this.contactRepository.createContact(userId, request.senderId);

            if (contact) return sanitizeContact(contact, userId);

            return null;
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateContactUseCase;