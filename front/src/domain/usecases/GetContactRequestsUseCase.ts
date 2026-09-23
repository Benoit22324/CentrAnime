import type { ContactRequestRepositoryInterface } from "../../interfaces/repositories/ContactRequestRepositoryInterface";
import type ContactRequest from "../entities/ContactRequest";

class GetContactRequestsUseCase {
    constructor(private readonly contactRequestRepository: ContactRequestRepositoryInterface) { }

    async execute(): Promise<ContactRequest[] | null> {
        try {
            const contactRequests = await this.contactRequestRepository.getContactRequests();

            return contactRequests;
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default GetContactRequestsUseCase;