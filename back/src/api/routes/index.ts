import { Router } from "express";
import { AuthRoute } from "./AuthRoute";
import { AnimeRoute } from "./AnimeRoute";
import { GenreRoute } from "./GenreRoute";
import { OpinionRoute } from "./OpinionRoute";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/anime", AnimeRoute);
router.use("/genre", GenreRoute);
router.use("/opinion", OpinionRoute);

export { router as ApiRouter };