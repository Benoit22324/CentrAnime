import type { DeleteContactInput } from "../../interfaces/inputs/DeleteContactInput";
import type { ContactRepositoryInterface } from "../../interfaces/repositories/ContactRepositoryInterface";

class DeleteContactUseCase {
    constructor(private readonly contactRepository: ContactRepositoryInterface) { }

    async execute(input: DeleteContactInput): Promise<void> {
        const { contactId } = input;

        try {
            await this.contactRepository.deleteContact(contactId);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default DeleteContactUseCase;