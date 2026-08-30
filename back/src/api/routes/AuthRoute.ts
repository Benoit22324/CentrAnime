import { Router } from "express";
import AuthController from "../controllers/AuthController";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import LoginUseCase from "../../application/usecases/LoginUseCase";
import RegisterUseCase from "../../application/usecases/RegisterUseCase";
import { authenticationMiddleware } from "../middlewares";
import GetUserByIdUseCase from "../../application/usecases/GetUserByIdUseCase";

const userRepository = new UserRepository();
const loginUseCase = new LoginUseCase(userRepository);
const registerUseCase = new RegisterUseCase(userRepository);
const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);

const authController = new AuthController(
    loginUseCase,
    registerUseCase,
    getUserByIdUseCase
);
const router = Router();

router.post("/login", authController.login.bind(authController));
router.post("/register", authController.register.bind(authController));
router.get("/logout", authenticationMiddleware, authController.logout);
router.get("/me", authenticationMiddleware, authController.me.bind(authController));

export { router as AuthRoute };