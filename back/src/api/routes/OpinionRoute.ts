import { Router } from "express";
import { authenticationMiddleware } from "../middlewares";
import OpinionRepository from "../../infrastructure/repositories/OpinionRepository";
import GetOpinionUseCase from "../../application/usecases/GetOpinionUseCase";
import CreateOpinionUseCase from "../../application/usecases/CreateOpinionUseCase";
import UpdateOpinionUseCase from "../../application/usecases/UpdateOpinionUseCase";
import OpinionController from "../controllers/OpinionController";

const opinionRepository = new OpinionRepository();
const getOpinionUseCase = new GetOpinionUseCase(opinionRepository);
const createOpinionUseCase = new CreateOpinionUseCase(opinionRepository);
const updateOpinionUseCase = new UpdateOpinionUseCase(opinionRepository);

const opinionController = new OpinionController(
    getOpinionUseCase,
    createOpinionUseCase,
    updateOpinionUseCase
);

const router = Router();

router.use(authenticationMiddleware);
router.get("/:animeId", opinionController.getOpinion.bind(opinionController));
router.post("/:animeId", opinionController.createOpinion.bind(opinionController));
router.patch("/:id", opinionController.updateOpinion.bind(opinionController));

export { router as OpinionRoute };