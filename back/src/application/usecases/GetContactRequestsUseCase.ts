import { sanitizeContactRequest } from "../../api/utility";
import ContactRequest from "../../domain/entities/ContactRequest";
import { ContactRequestRepositoryInterface } from "../../domain/interfaces/ContactRequestRepositoryInterface";

class GetContactRequestsUseCase {
    constructor(private readonly contactRequestRepository: ContactRequestRepositoryInterface) { }

    async execute(userId: string): Promise<ContactRequest[] | null> {
        try {
            const contacts = await this.contactRequestRepository.getContactRequests(userId);

            if (contacts && contacts.length > 0) {
                const contactRequestInstances = contacts.map(c => sanitizeContactRequest(c));

                return contactRequestInstances;
            }

            return null;
        } catch (err) {
            throw new Error("Liste de requêtes de contact introuvable");
        }
    }
}

export default GetContactRequestsUseCase;