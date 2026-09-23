import { ContactRepositoryInterface } from "../../domain/interfaces/ContactRepositoryInterface";

class DeleteContactUseCase {
    constructor(private readonly contactRepository: ContactRepositoryInterface) { }

    async execute(id: string, userId: string): Promise<void> {
        try {
            await this.contactRepository.deleteContact(id, userId);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteContactUseCase;