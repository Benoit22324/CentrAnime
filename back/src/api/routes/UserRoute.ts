import { Router } from "express";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import UpdateUserUseCase from "../../application/usecases/UpdateUserUseCase";
import DeleteUserUseCase from "../../application/usecases/DeleteUserUseCase";
import UserController from "../controllers/UserController";
import { authenticationMiddleware } from "../middlewares";

const userRepository = new UserRepository();
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);

const userController = new UserController(
    updateUserUseCase,
    deleteUserUseCase
)

const router = Router();

router.use(authenticationMiddleware);

router.patch("/", userController.updateUser.bind(userController));
router.delete("/", userController.deleteUser.bind(userController));

export { router as UserRoute };