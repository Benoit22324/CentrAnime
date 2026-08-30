import { Router } from "express";
import AnimeListRepository from "../../infrastructure/repositories/AnimeListRepository";
import GetAnimeListsUseCase from "../../application/usecases/GetAnimeListsUseCase";
import GetAnimeListByIdUseCase from "../../application/usecases/GetAnimeListByIdUseCase";
import GetAnimeListByPageUseCase from "../../application/usecases/GetAnimeListByPageUseCase";
import CreateAnimeListUseCase from "../../application/usecases/CreateAnimeListUseCase";
import AnimeListAddAnimeUseCase from "../../application/usecases/AnimeListAddAnimeUseCase";
import UpdateAnimeListUseCase from "../../application/usecases/UpdateAnimeListUseCase";
import RemoveAnimeAnimeListUseCase from "../../application/usecases/RemoveAnimeAnimeListUseCase";
import DeleteAnimeListUseCase from "../../application/usecases/DeleteAnimeListUseCase";
import AnimeListController from "../controllers/AnimeListController";
import { authenticationMiddleware } from "../middlewares";

const animeListRepository = new AnimeListRepository();
const getAnimeListsUseCase = new GetAnimeListsUseCase(animeListRepository);
const getAnimeListByIdUseCase = new GetAnimeListByIdUseCase(animeListRepository);
const getAnimeListByPageUseCase = new GetAnimeListByPageUseCase(animeListRepository);
const createAnimeListUseCase = new CreateAnimeListUseCase(animeListRepository);
const animeListAddAnimeUseCase = new AnimeListAddAnimeUseCase(animeListRepository);
const updateAnimeListUseCase = new UpdateAnimeListUseCase(animeListRepository);
const removeAnimeAnimeListUseCase = new RemoveAnimeAnimeListUseCase(animeListRepository);
const deleteAnimeListUseCase = new DeleteAnimeListUseCase(animeListRepository);

const animeListController = new AnimeListController(
    getAnimeListsUseCase,
    getAnimeListByIdUseCase,
    getAnimeListByPageUseCase,
    createAnimeListUseCase,
    animeListAddAnimeUseCase,
    updateAnimeListUseCase,
    removeAnimeAnimeListUseCase,
    deleteAnimeListUseCase
);

const router = Router();

router.use(authenticationMiddleware);

router.get("/", animeListController.getAniLists.bind(animeListController));
router.get("/offset", animeListController.getAniListByPage.bind(animeListController));
router.get("/:anilistId", animeListController.getAniListById.bind(animeListController));
router.post("/", animeListController.createAnimeList.bind(animeListController));
router.post("/anime/:anilistId", animeListController.addAnimeToAnimeList.bind(animeListController));
router.patch("/:id", animeListController.updateAnimeList.bind(animeListController));
router.delete("/anime/:id", animeListController.removeAnimeToAnimeList.bind(animeListController));
router.delete("/:anilistId", animeListController.deleteAnimeList.bind(animeListController));

export { router as AnimeListRoute };