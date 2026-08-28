import { Router } from "express";
import { redisCachingMiddleware } from "../middlewares/redisMiddleware";
import GenreRepository from "../../infrastructure/repositories/GenreRepository";
import GetGenresUseCase from "../../application/usecases/GetGenresUseCase";
import GenreController from "../controllers/GenreController";

const genreRepository = new GenreRepository();
const getGenresUseCase = new GetGenresUseCase(genreRepository);

const genreController = new GenreController(
    getGenresUseCase
)

const router = Router();

router.get("/", redisCachingMiddleware(), genreController.getGenres.bind(genreController));

export { router as GenreRoute };