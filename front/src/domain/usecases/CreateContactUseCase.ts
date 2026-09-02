import type { CreateContactInput } from "../../interfaces/inputs/CreateContactInput";
import type { ContactRepositoryInterface } from "../../interfaces/repositories/ContactRepositoryInterface";
import type Contact from "../entities/Contact";

class CreateContactUseCase {
    constructor(private readonly contactRepository: ContactRepositoryInterface) { }

    async execute(input: CreateContactInput): Promise<Contact | null> {
        const { requestId } = input;

        try {
            const contact = await this.contactRepository.createContact(requestId);

            return contact;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default CreateContactUseCase;