import { NextFunction, Request, Response } from "express";
import DeleteUserUseCase from "../../application/usecases/DeleteUserUseCase";
import UpdateUserUseCase from "../../application/usecases/UpdateUserUseCase";
import { UpdateUserInputs } from "../dto";

class UserController {
    constructor(
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase
    ) {}

    async updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { username } = req.body as UpdateUserInputs;

            const user = await this.updateUserUseCase.execute(id, username);

            return res.jsonSuccess(user, 201);
        } catch (error) {
            next(error);
        }
    }

    async deleteUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;

            await this.deleteUserUseCase.execute(id);

            res.cookie("jwt", "", {
                expires: new Date("2000-01-01"),
                httpOnly: true,
                secure: true
            });

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;