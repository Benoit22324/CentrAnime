import { NextFunction, Request, Response } from "express";
import GetGenresUseCase from "../../application/usecases/GetGenresUseCase";

class GenreController {
    constructor(
        private readonly getGenresUseCase: GetGenresUseCase
    ) { }

    async getGenres(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const genres = await this.getGenresUseCase.execute();

            return res.jsonSuccess(genres);
        } catch (error) {
            next(error);
        }
    }
}

export default GenreController;