import type { CreateContactRequestInput } from "../../interfaces/inputs/CreateContactRequestInput";
import type { ContactRequestRepositoryInterface } from "../../interfaces/repositories/ContactRequestRepositoryInterface";

class CreateContactRequestUseCase {
    constructor(private readonly contactRequestRepository: ContactRequestRepositoryInterface) { }

    async execute(input: CreateContactRequestInput): Promise<string | void> {
        const { email } = input;

        try {
            const response = await this.contactRequestRepository.createContactRequest(email);

            return response;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default CreateContactRequestUseCase;