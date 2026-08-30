import { Router } from "express";
import RecommandationController from "../controllers/RecommandationController";
import RecommandationRepository from "../../infrastructure/repositories/RecommandationRepository";
import GetRecommandationsUseCase from "../../application/usecases/GetRecommandationsUseCase";
import GetRecommandationByIdUseCase from "../../application/usecases/GetRecommandationByIdUseCase";
import GetRecommandationByPageUseCase from "../../application/usecases/GetRecommandationByPageUseCase";
import CreateRecommandationUseCase from "../../application/usecases/CreateRecommandationUseCase";
import RecommandationAddAnimeUseCase from "../../application/usecases/RecommandationAddAnimeUseCase";
import UpdateRecommandationUseCase from "../../application/usecases/UpdateRecommandationUseCase";
import RemoveAnimeRecommandationUseCase from "../../application/usecases/RemoveAnimeRecommandationUseCase";
import DeleteRecommandationUseCase from "../../application/usecases/DeleteRecommandationUseCase";
import { authenticationMiddleware } from "../middlewares";

const recommandationRepository = new RecommandationRepository();
const getRecommandationsUseCase = new GetRecommandationsUseCase(recommandationRepository);
const getRecommandationByIdUseCase = new GetRecommandationByIdUseCase(recommandationRepository);
const getRecommandationByPageUseCase = new GetRecommandationByPageUseCase(recommandationRepository);
const createRecommandationUseCase = new CreateRecommandationUseCase(recommandationRepository);
const recommandationAddAnimeUseCase = new RecommandationAddAnimeUseCase(recommandationRepository);
const updateRecommandationUseCase = new UpdateRecommandationUseCase(recommandationRepository);
const removeAnimeRecommandationUseCase = new RemoveAnimeRecommandationUseCase(recommandationRepository);
const deleteRecommandationUseCase = new DeleteRecommandationUseCase(recommandationRepository);

const recommandationController = new RecommandationController(
    getRecommandationsUseCase,
    getRecommandationByIdUseCase,
    getRecommandationByPageUseCase,
    createRecommandationUseCase,
    recommandationAddAnimeUseCase,
    updateRecommandationUseCase,
    removeAnimeRecommandationUseCase,
    deleteRecommandationUseCase
)

const router = Router();

router.use(authenticationMiddleware);

router.get("/", recommandationController.getRecommandations.bind(recommandationController));
router.get("/offset", recommandationController.getRecommandationByPage.bind(recommandationController));
router.get("/:recoId", recommandationController.getRecommandationById.bind(recommandationController));
router.post("/", recommandationController.createRecommandation.bind(recommandationController));
router.post("/anime/:recoId", recommandationController.addAnimeToRecommandation.bind(recommandationController));
router.patch("/:id", recommandationController.updateRecommandation.bind(recommandationController));
router.delete("/anime/:id", recommandationController.removeAnimeToRecommandation.bind(recommandationController));
router.delete("/:recoId", recommandationController.deleteRecommandation.bind(recommandationController));

export { router as RecommandationRoute };