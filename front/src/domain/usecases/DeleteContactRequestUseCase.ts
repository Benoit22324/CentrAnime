import type { DeleteContactRequestInput } from "../../interfaces/inputs/DeleteContactRequestInput";
import type { ContactRequestRepositoryInterface } from "../../interfaces/repositories/ContactRequestRepositoryInterface";

class DeleteContactRequestUseCase {
    constructor(private readonly contactRequestRepository: ContactRequestRepositoryInterface) { }

    async execute(input: DeleteContactRequestInput): Promise<void> {
        const { requestId } = input;

        try {
            await this.contactRequestRepository.deleteContactRequest(requestId);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default DeleteContactRequestUseCase;