import { NextFunction, Request, Response } from "express";
import { LoginInputs, RegisterInputs } from "../dto";
import LoginUseCase from "../../application/usecases/LoginUseCase";
import RegisterUseCase from "../../application/usecases/RegisterUseCase";
import { generateSignature } from "../utility";
import GetUserByIdUseCase from "../../application/usecases/GetUserByIdUseCase";

class AuthController {
    constructor(
        private readonly loginUseCase: LoginUseCase,
        private readonly registerUseCase: RegisterUseCase,
        private readonly getUserByIdUseCase: GetUserByIdUseCase
    ) { }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body as LoginInputs;

            const user = await this.loginUseCase.execute(email, password);

            const token = generateSignature(user);
            const currentDate = new Date();
            const expiration = new Date(`${currentDate.getFullYear()}-${currentDate.getDate() + 1 > 31 ? currentDate.getMonth() + 2 : currentDate.getMonth() + 1}-${currentDate.getDate() + 1 > 31 ? 1 : currentDate.getDate() + 1}`);

            res.cookie("jwt", token, {
                httpOnly: true,
                secure: true,
                expires: expiration
            })

            return res.jsonSuccess(user);
        } catch (error) {
            next(error);
        }
    }

    async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, email, password } = req.body as RegisterInputs;

            await this.registerUseCase.execute(username, email, password);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }

    async logout(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            res.cookie("jwt", "", {
                expires: new Date("2000-01-01"),
                httpOnly: true,
                secure: true
            });

            return res.jsonSuccess(null);
        } catch (error) {
            next(error);
        }
    }

    async me(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;

            const user = this.getUserByIdUseCase.execute(id);

            return res.jsonSuccess(user)
        } catch (error) {
            next(error);
        }
    }
}

export default AuthController;