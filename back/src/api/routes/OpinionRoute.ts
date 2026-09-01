import { Router } from "express";
import { authenticationMiddleware } from "../middlewares";
import OpinionRepository from "../../infrastructure/repositories/OpinionRepository";
import GetOpinionUseCase from "../../application/usecases/GetOpinionUseCase";
import CreateOpinionUseCase from "../../application/usecases/CreateOpinionUseCase";
import UpdateOpinionUseCase from "../../application/usecases/UpdateOpinionUseCase";
import OpinionController from "../controllers/OpinionController";
import GetViewOpinionsUseCase from "../../application/usecases/GetViewOpinionsUseCase";

const opinionRepository = new OpinionRepository();
const getViewOpinionsUseCase = new GetViewOpinionsUseCase(opinionRepository);
const getOpinionUseCase = new GetOpinionUseCase(opinionRepository);
const createOpinionUseCase = new CreateOpinionUseCase(opinionRepository);
const updateOpinionUseCase = new UpdateOpinionUseCase(opinionRepository);

const opinionController = new OpinionController(
    getViewOpinionsUseCase,
    getOpinionUseCase,
    createOpinionUseCase,
    updateOpinionUseCase
);

const router = Router();

router.use(authenticationMiddleware);
router.get("/", opinionController.getViewOpinion.bind(opinionController));
router.get("/:animeId", opinionController.getOpinion.bind(opinionController));
router.post("/:animeId", opinionController.createOpinion.bind(opinionController));
router.patch("/:id", opinionController.updateOpinion.bind(opinionController));

export { router as OpinionRoute };