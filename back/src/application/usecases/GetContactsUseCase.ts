import { sanitizeContact } from "../../api/utility";
import Contact from "../../domain/entities/Contact";
import { ContactRepositoryInterface } from "../../domain/interfaces/ContactRepositoryInterface";

class GetContactsUseCase {
    constructor(private readonly contactRepository: ContactRepositoryInterface) { }

    async execute(userId: string): Promise<Contact[] | null> {
        try {
            const contacts = await this.contactRepository.getContacts(userId);

            if (contacts) {
                const contactInstances = contacts.map(c => sanitizeContact(c, userId));

                return contactInstances;
            }

            return null;
        } catch (err) {
            throw new Error("Liste de Contacts introuvable");
        }
    }
}

export default GetContactsUseCase;