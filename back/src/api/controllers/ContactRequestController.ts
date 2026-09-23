import { NextFunction, Request, Response } from "express";
import CreateContactRequestUseCase from "../../application/usecases/CreateContactRequestUseCase";
import DeleteContactRequestUseCase from "../../application/usecases/DeleteContactRequestUseCase";
import GetContactRequestsUseCase from "../../application/usecases/GetContactRequestsUseCase";
import { CreateContactRequestInputs } from "../dto";

class ContactRequestController {
    constructor(
        private readonly getContactRequestsUseCase: GetContactRequestsUseCase,
        private readonly createContactRequestUseCase: CreateContactRequestUseCase,
        private readonly deleteContactRequestUseCase: DeleteContactRequestUseCase,
    ) { }

    async getContactRequests(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;

            const contactRequests = await this.getContactRequestsUseCase.execute(id);

            return res.jsonSuccess(contactRequests)
        } catch (error) {
            next(error);
        }
    }

    async createContactRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { email } = req.body as CreateContactRequestInputs;

            await this.createContactRequestUseCase.execute(id, email);

            return res.jsonSuccess(null, 201)
        } catch (error) {
            next(error);
        }
    }

    async deleteContactRequest(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { requestId } = req.params;

            if (!requestId || typeof(requestId) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.deleteContactRequestUseCase.execute(requestId, id);

            return res.jsonSuccess(null, 201)
        } catch (error) {
            next(error);
        }
    }
}

export default ContactRequestController;