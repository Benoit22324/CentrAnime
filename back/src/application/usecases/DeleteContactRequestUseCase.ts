import { ContactRequestRepositoryInterface } from "../../domain/interfaces/ContactRequestRepositoryInterface";

class DeleteContactRequestUseCase {
    constructor(private readonly contactRequestRepository: ContactRequestRepositoryInterface) { }

    async execute(id: string, userId: string): Promise<void> {
        try {
            await this.contactRequestRepository.deleteContactRequest(id, userId);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteContactRequestUseCase;