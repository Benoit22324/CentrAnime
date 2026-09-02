import type { ContactRepositoryInterface } from "../../interfaces/repositories/ContactRepositoryInterface";
import type Contact from "../entities/Contact";

class GetContactsUseCase {
    constructor(private readonly contactRepository: ContactRepositoryInterface) { }

    async execute(): Promise<Contact[] | null> {
        try {
            const contacts = await this.contactRepository.getContacts();

            return contacts;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetContactsUseCase;