import { NextFunction, Request, Response } from "express";
import GetRecommandationsUseCase from "../../application/usecases/GetRecommandationsUseCase";
import GetRecommandationByIdUseCase from "../../application/usecases/GetRecommandationByIdUseCase";
import GetRecommandationByPageUseCase from "../../application/usecases/GetRecommandationByPageUseCase";
import CreateRecommandationUseCase from "../../application/usecases/CreateRecommandationUseCase";
import RecommandationAddAnimeUseCase from "../../application/usecases/RecommandationAddAnimeUseCase";
import { CreateRecommandationInputs } from "../dto";
import UpdateRecommandationUseCase from "../../application/usecases/UpdateRecommandationUseCase";
import RemoveAnimeRecommandationUseCase from "../../application/usecases/RemoveAnimeRecommandationUseCase";
import DeleteRecommandationUseCase from "../../application/usecases/DeleteRecommandationUseCase";
import RecommandationAddFavoriteUseCase from "../../application/usecases/RecommandationAddFavoriteUseCase";
import RecommandationAddLikeUseCase from "../../application/usecases/RecommandationAddLikeUseCase";
import RemoveFavoriteRecommandationUseCase from "../../application/usecases/RemoveFavoriteRecommandationUseCase";
import RemoveLikeRecommandationUseCase from "../../application/usecases/RemoveLikeRecommandationUseCase";

class RecommandationController {
    constructor(
        private readonly getRecommandationsUseCase: GetRecommandationsUseCase,
        private readonly getRecommandationByIdUseCase: GetRecommandationByIdUseCase,
        private readonly getRecommandationByPageUseCase: GetRecommandationByPageUseCase,
        private readonly createRecommandationUseCase: CreateRecommandationUseCase,
        private readonly recommandationAddAnimeUseCase: RecommandationAddAnimeUseCase,
        private readonly recommandationAddFavoriteUseCase: RecommandationAddFavoriteUseCase,
        private readonly recommandationAddLikeUseCase: RecommandationAddLikeUseCase,
        private readonly updateRecommandationUseCase: UpdateRecommandationUseCase,
        private readonly removeAnimeRecommandationUseCase: RemoveAnimeRecommandationUseCase,
        private readonly removeFavoriteRecommandationUseCase: RemoveFavoriteRecommandationUseCase,
        private readonly removeLikeRecommandationUseCase: RemoveLikeRecommandationUseCase,
        private readonly deleteRecommandationUseCase: DeleteRecommandationUseCase
    ) { }

    async getRecommandations(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;

            const recommandations = await this.getRecommandationsUseCase.execute(id);

            return res.jsonSuccess(recommandations);
        } catch (error) {
            next(error);
        }
    }

    async getRecommandationById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { recoId } = req.params;

            if (!recoId || typeof(recoId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const recommandation = await this.getRecommandationByIdUseCase.execute(recoId, id);

            return res.jsonSuccess(recommandation);
        } catch (error) {
            next(error);
        }
    }

    async getRecommandationByPage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const user = req.user;
            const selectedPage = parseInt(req.query.selectedPage as string) || 0;
            const maxItems = parseInt(req.query.maxItems as string) || 12;

            const recommandations = await this.getRecommandationByPageUseCase.execute(selectedPage, maxItems, user?.id || undefined);

            return res.jsonSuccess(recommandations);
        } catch (error) {
            next(error);
        }
    }

    async createRecommandation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { title, description } = req.body as CreateRecommandationInputs;

            await this.createRecommandationUseCase.execute(id, title, description);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }

    async addAnimeToRecommandation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { recoId } = req.params;
            const animeId = req.query.animeId as string;

            if (!recoId || typeof(recoId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const recommandation = await this.recommandationAddAnimeUseCase.execute(recoId, animeId, id);

            return res.jsonSuccess(recommandation, 201);
        } catch (error) {
            next(error);
        }
    }

    async addFavoriteRecommandation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { recoId } = req.params;

            if (!recoId || typeof(recoId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const recommandation = await this.recommandationAddFavoriteUseCase.execute(recoId, id);

            return res.jsonSuccess(recommandation, 201);
        } catch (error) {
            next(error);
        }
    }

    async addLikeRecommandation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { recoId } = req.params;

            if (!recoId || typeof(recoId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const recommandation = await this.recommandationAddLikeUseCase.execute(recoId, id);

            return res.jsonSuccess(recommandation, 201);
        } catch (error) {
            next(error);
        }
    }

    async updateRecommandation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const user = req.user;
            const { id } = req.params;
            const { title, description } = req.body as CreateRecommandationInputs;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            const recommandation = await this.updateRecommandationUseCase.execute(id, title, description, user.id);

            return res.jsonSuccess(recommandation, 201);
        } catch (error) {
            next(error);
        }
    }

    async removeAnimeToRecommandation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.params;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.removeAnimeRecommandationUseCase.execute(id);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }

    async removeFavoriteReco(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.params;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.removeFavoriteRecommandationUseCase.execute(id);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }

    async removeLikeReco(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.params;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.removeLikeRecommandationUseCase.execute(id);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }

    async deleteRecommandation(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { recoId } = req.params;

            if (!recoId || typeof(recoId) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.deleteRecommandationUseCase.execute(recoId, id);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default RecommandationController;