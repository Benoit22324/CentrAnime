import { NextFunction, Request, Response } from "express";
import CreateOpinionUseCase from "../../application/usecases/CreateOpinionUseCase";
import GetOpinionUseCase from "../../application/usecases/GetOpinionUseCase";
import UpdateOpinionUseCase from "../../application/usecases/UpdateOpinionUseCase";
import { CreateOpinionInputs } from "../dto";

class OpinionController {
    constructor(
        private readonly getOpinionUseCase: GetOpinionUseCase,
        private readonly createOpinionUseCase: CreateOpinionUseCase,
        private readonly updateOpinionUseCase: UpdateOpinionUseCase
    ) { }

    async getOpinion(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { animeId } = req.params;

            if (!animeId || typeof(animeId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const opinion = await this.getOpinionUseCase.execute(animeId, id);

            return res.jsonSuccess(opinion);
        } catch (error) {
            next(error);
        }
    }

    async createOpinion(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { animeId } = req.params;
            const { viewStatus, note, comment } = req.body as CreateOpinionInputs;

            if (!animeId || typeof(animeId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const data = {
                viewStatus,
                note,
                comment
            }

            const opinion = await this.createOpinionUseCase.execute(animeId, id, data);

            return res.jsonSuccess(opinion, 201);
        } catch (error) {
            next(error);
        }
    }

    async updateOpinion(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.params;
            const { viewStatus, note, comment } = req.body as CreateOpinionInputs;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            const data = {
                viewStatus,
                note,
                comment
            }

            const opinion = await this.updateOpinionUseCase.execute(id, data);

            return res.jsonSuccess(opinion, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default OpinionController;