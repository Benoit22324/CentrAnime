import { Router } from "express";
import { AuthRoute } from "./AuthRoute";
import { AnimeRoute } from "./AnimeRoute";
import { GenreRoute } from "./GenreRoute";
import { OpinionRoute } from "./OpinionRoute";
import { AnimeListRoute } from "./AnimeListRoute";
import { RecommandationRoute } from "./RecommandationRoute";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/anime", AnimeRoute);
router.use("/genre", GenreRoute);
router.use("/opinion", OpinionRoute);
router.use("/anilist", AnimeListRoute);
router.use("/reco", RecommandationRoute);

export { router as ApiRouter };