import { NextFunction, Request, Response } from "express";
import GetAnimeByIdUseCase from "../../application/usecases/GetAnimeByIdUseCase";
import GetAnimesByPageUseCase from "../../application/usecases/GetAnimesByPageUseCase";

class AnimeController {
    constructor(
        private readonly getAnimesByPageUseCase: GetAnimesByPageUseCase,
        private readonly getAnimeByIdUseCase: GetAnimeByIdUseCase
    ) { }

    async getAnimesByPage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            // Récupération des queries
            const selectedPage = parseInt(req.query.selectedPage as string) || 0;
            const maxItems = parseInt(req.query.maxItems as string) || 10;
            const searchName = req.query.searchName as string || null;
            const filterGenre = req.query.filterGenre as string || null;

            // Appel du UseCase liée à la pagination offset
            const animes = await this.getAnimesByPageUseCase.execute(selectedPage, maxItems, searchName, filterGenre);

            // Retour du résultat
            return res.jsonSuccess(animes);
        } catch (error) {
            next(error);
        }
    }

    async getAnimeById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id } = req.params;

            if (!id || typeof(id) !== "string") return res.jsonError("Paramètre invalide", 404);

            const anime = await this.getAnimeByIdUseCase.execute(id);

            return res.jsonSuccess(anime);
        } catch (error) {
            next(error);
        }
    }
}

export default AnimeController;