import { Router } from "express";
import { AuthRoute } from "./AuthRoute";
import { AnimeRoute } from "./AnimeRoute";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/anime", AnimeRoute);

export { router as ApiRouter };