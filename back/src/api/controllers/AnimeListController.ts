import { NextFunction, Request, Response } from "express";
import AnimeListAddAnimeUseCase from "../../application/usecases/AnimeListAddAnimeUseCase";
import CreateAnimeListUseCase from "../../application/usecases/CreateAnimeListUseCase";
import DeleteAnimeListUseCase from "../../application/usecases/DeleteAnimeListUseCase";
import GetAnimeListByIdUseCase from "../../application/usecases/GetAnimeListByIdUseCase";
import GetAnimeListByPageUseCase from "../../application/usecases/GetAnimeListByPageUseCase";
import GetAnimeListsUseCase from "../../application/usecases/GetAnimeListsUseCase";
import RemoveAnimeAnimeListUseCase from "../../application/usecases/RemoveAnimeAnimeListUseCase";
import UpdateAnimeListUseCase from "../../application/usecases/UpdateAnimeListUseCase";
import { CreateAnimeListInputs } from "../dto";

class AnimeListController {
    constructor(
        private readonly getAnimeListsUseCase: GetAnimeListsUseCase,
        private readonly getAnimeListByIdUseCase: GetAnimeListByIdUseCase,
        private readonly getAnimeListByPageUseCase: GetAnimeListByPageUseCase,
        private readonly createAnimeListUseCase: CreateAnimeListUseCase,
        private readonly animeListAddAnimeUseCase: AnimeListAddAnimeUseCase,
        private readonly updateAnimeListUseCase: UpdateAnimeListUseCase,
        private readonly removeAnimeAnimeListUseCase: RemoveAnimeAnimeListUseCase,
        private readonly deleteAnimeListUseCase: DeleteAnimeListUseCase
    ) { }

    async getAniLists(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;

            const anilists = await this.getAnimeListsUseCase.execute(id);

            return res.jsonSuccess(anilists);
        } catch (error) {
            next(error);
        }
    }

    async getAniListById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { anilistId } = req.params;

            if (!anilistId || typeof(anilistId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const anilists = await this.getAnimeListByIdUseCase.execute(anilistId, id);

            return res.jsonSuccess(anilists);
        } catch (error) {
            next(error);
        }
    }

    async getAniListByPage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const selectedPage = parseInt(req.query.selectedPage as string) || 0;
            const maxItems = parseInt(req.query.maxItems as string) || 10;

            const anilists = await this.getAnimeListByPageUseCase.execute(selectedPage, maxItems, id);

            return res.jsonSuccess(anilists);
        } catch (error) {
            next(error);
        }
    }

    async createAnimeList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { title } = req.body as CreateAnimeListInputs;

            await this.createAnimeListUseCase.execute(id, title);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }

    async addAnimeToAnimeList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { anilistId } = req.params;
            const animeId = req.query.animeId as string;

            if (!anilistId || typeof(anilistId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const anilist = await this.animeListAddAnimeUseCase.execute(anilistId, animeId);

            return res.jsonSuccess(anilist, 201);
        } catch (error) {
            next(error);
        }
    }

    async updateAnimeList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.params;
            const { title } = req.body as CreateAnimeListInputs;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            const anilist = await this.updateAnimeListUseCase.execute(id, title);

            return res.jsonSuccess(anilist, 201);
        } catch (error) {
            next(error);
        }
    }

    async removeAnimeToAnimeList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.params;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.removeAnimeAnimeListUseCase.execute(id);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }

    async deleteAnimeList(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { anilistId } = req.params;

            if (!anilistId || typeof(anilistId) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.deleteAnimeListUseCase.execute(anilistId, id);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default AnimeListController;