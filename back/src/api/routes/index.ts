import { Router } from "express";
import { AuthRoute } from "./AuthRoute";
import { AnimeRoute } from "./AnimeRoute";
import { GenreRoute } from "./GenreRoute";

const router = Router();

router.use("/auth", AuthRoute);
router.use("/anime", AnimeRoute);
router.use("/genre", GenreRoute);

export { router as ApiRouter };