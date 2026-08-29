import type { AuthRepositoryInterface } from "../../interfaces/repositories/AuthRepositoryInterface";
import type { LoginFormData } from "../../typings/LoginFormData";
import User from "../entities/User";

class LoginUseCase {
    constructor(private readonly authRepository: AuthRepositoryInterface) { }

    async execute(payload: LoginFormData): Promise<User | string | null> {
        try {
            const response = await this.authRepository.login(payload);

            if (response && response.success && response.data) {
                const data = response.data;
                const userInstance = new User(data.id, data.username, data.email, data.createdAt);

                return userInstance;
            } else if (response && !response.success && response.error) {
                return response.error.message
            }

            return null;
        } catch(err) {
            console.error(err)
            throw new Error("Une erreur est survenue");
        }
    }
}

export default LoginUseCase;