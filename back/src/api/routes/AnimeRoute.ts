import { Router } from "express";
import AnimeController from "../controllers/AnimeController";
import AnimeRepository from "../../infrastructure/repositories/AnimeRepository";
import GetAnimesByPageUseCase from "../../application/usecases/GetAnimesByPageUseCase";
import GetAnimeByIdUseCase from "../../application/usecases/GetAnimeByIdUseCase";
import ApiAniListRepository from "../../infrastructure/repositories/ApiAniListRepository";
import { redisCachingMiddleware } from "../middlewares/redisMiddleware";

const apiAniListRepository = new ApiAniListRepository();
const animeRepository = new AnimeRepository();
const getAnimesByPageUseCase = new GetAnimesByPageUseCase(animeRepository, apiAniListRepository);
const getAnimeByIdUseCase = new GetAnimeByIdUseCase(animeRepository);

const animeController = new AnimeController(
    getAnimesByPageUseCase,
    getAnimeByIdUseCase
);

const router = Router();

router.get("/offset", redisCachingMiddleware({ EX: 86400 }), animeController.getAnimesByPage.bind(animeController));
router.get("/:id", redisCachingMiddleware({ EX: 86400 }), animeController.getAnimeById.bind(animeController));

export { router as AnimeRoute };