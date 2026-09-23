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
import RecommandationAddFavoriteUseCase from "../../application/usecases/RecommandationAddFavoriteUseCase";
import RecommandationAddLikeUseCase from "../../application/usecases/RecommandationAddLikeUseCase";
import RemoveFavoriteRecommandationUseCase from "../../application/usecases/RemoveFavoriteRecommandationUseCase";
import RemoveLikeRecommandationUseCase from "../../application/usecases/RemoveLikeRecommandationUseCase";
import { optionalAuthenticationMiddleware } from "../middlewares/optionalAuthenticationMiddleware";
import GetFavoriteRecommandationsUseCase from "../../application/usecases/GetFavoriteRecommandationsUseCase";

const recommandationRepository = new RecommandationRepository();
const getFavoriteRecommandationsUseCase = new GetFavoriteRecommandationsUseCase(recommandationRepository);
const getRecommandationsUseCase = new GetRecommandationsUseCase(recommandationRepository);
const getRecommandationByIdUseCase = new GetRecommandationByIdUseCase(recommandationRepository);
const getRecommandationByPageUseCase = new GetRecommandationByPageUseCase(recommandationRepository);
const createRecommandationUseCase = new CreateRecommandationUseCase(recommandationRepository);
const recommandationAddAnimeUseCase = new RecommandationAddAnimeUseCase(recommandationRepository);
const recommandationAddFavoriteUseCase = new RecommandationAddFavoriteUseCase(recommandationRepository);
const recommandationAddLikeUseCase = new RecommandationAddLikeUseCase(recommandationRepository);
const updateRecommandationUseCase = new UpdateRecommandationUseCase(recommandationRepository);
const removeAnimeRecommandationUseCase = new RemoveAnimeRecommandationUseCase(recommandationRepository);
const removeFavoriteRecommandationUseCase = new RemoveFavoriteRecommandationUseCase(recommandationRepository);
const removeLikeRecommandationUseCase = new RemoveLikeRecommandationUseCase(recommandationRepository);
const deleteRecommandationUseCase = new DeleteRecommandationUseCase(recommandationRepository);

const recommandationController = new RecommandationController(
    getFavoriteRecommandationsUseCase,
    getRecommandationsUseCase,
    getRecommandationByIdUseCase,
    getRecommandationByPageUseCase,
    createRecommandationUseCase,
    recommandationAddAnimeUseCase,
    recommandationAddFavoriteUseCase,
    recommandationAddLikeUseCase,
    updateRecommandationUseCase,
    removeAnimeRecommandationUseCase,
    removeFavoriteRecommandationUseCase,
    removeLikeRecommandationUseCase,
    deleteRecommandationUseCase
)

const router = Router();

router.get("/offset", optionalAuthenticationMiddleware, recommandationController.getRecommandationByPage.bind(recommandationController));

router.use(authenticationMiddleware);

router.get("/favorite", recommandationController.getFavoriteRecommandations.bind(recommandationController));
router.get("/", recommandationController.getRecommandations.bind(recommandationController));
router.get("/:recoId", recommandationController.getRecommandationById.bind(recommandationController));
router.post("/", recommandationController.createRecommandation.bind(recommandationController));
router.post("/anime/:recoId", recommandationController.addAnimeToRecommandation.bind(recommandationController));
router.post("/favorite/:recoId", recommandationController.addFavoriteRecommandation.bind(recommandationController));
router.post("/like/:recoId", recommandationController.addLikeRecommandation.bind(recommandationController));
router.patch("/:id", recommandationController.updateRecommandation.bind(recommandationController));
router.delete("/anime/:id", recommandationController.removeAnimeToRecommandation.bind(recommandationController));
router.delete("/favorite/:id", recommandationController.removeFavoriteReco.bind(recommandationController));
router.delete("/like/:id", recommandationController.removeLikeReco.bind(recommandationController));
router.delete("/:recoId", recommandationController.deleteRecommandation.bind(recommandationController));

export { router as RecommandationRoute };