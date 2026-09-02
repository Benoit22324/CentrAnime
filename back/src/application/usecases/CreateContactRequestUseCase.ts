import { sanitizeContactRequest } from "../../api/utility";
import ContactRequest from "../../domain/entities/ContactRequest";
import { ContactRepositoryInterface } from "../../domain/interfaces/ContactRepositoryInterface";
import { ContactRequestRepositoryInterface } from "../../domain/interfaces/ContactRequestRepositoryInterface";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class CreateContactRequestUseCase {
    constructor(
        private readonly userRepository: UserRepositoryInterface,
        private readonly contactRepository: ContactRepositoryInterface,
        private readonly contactRequestRepository: ContactRequestRepositoryInterface
    ) { }

    async execute(userId: string, email: string): Promise<void> {
        if (!email) throw new Error("L'email de la personne est requise");

        const receiver = await this.userRepository.findByEmail(email);

        if (!receiver) throw new Error("L'utilisateur n'existe pas");

        const isContact = await this.contactRepository.getContactByUsers(userId, receiver.id);

        if (isContact) throw new Error("Vous êtes déjà en contact");

        const isSent = await this.contactRequestRepository.getContactRequestByUser(userId);

        if (isSent) throw new Error("Vous avez déjà envoyé/reçu une requête");

        try {
            await this.contactRequestRepository.createContactRequest(userId, receiver.id);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default CreateContactRequestUseCase;