import { NextFunction, Request, Response } from "express";
import DeleteContactUseCase from "../../application/usecases/DeleteContactUseCase";
import GetContactsUseCase from "../../application/usecases/GetContactsUseCase";
import CreateContactUseCase from "../../application/usecases/CreateContactUseCase";

class ContactController {
    constructor(
        private readonly getContactsUseCase: GetContactsUseCase,
        private readonly createContactUseCase: CreateContactUseCase,
        private readonly deleteContactUseCase: DeleteContactUseCase
    ) { }

    async getContacts(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;

            const contacts = await this.getContactsUseCase.execute(id);

            return res.jsonSuccess(contacts)
        } catch (error) {
            next(error);
        }
    }

    async createContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { requestId } = req.params;

            if (!requestId || typeof(requestId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const contact = await this.createContactUseCase.execute(requestId, id);

            return res.jsonSuccess(contact, 201)
        } catch (error) {
            next(error);
        }
    }

    async deleteContact(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { contactId } = req.params;

            if (!contactId || typeof(contactId) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.deleteContactUseCase.execute(contactId, id);

            return res.jsonSuccess(null, 201)
        } catch (error) {
            next(error);
        }
    }
}

export default ContactController;