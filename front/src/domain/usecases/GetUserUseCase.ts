import type { AuthRepositoryInterface } from "../../interfaces/repositories/AuthRepositoryInterface";
import User from "../entities/User";

class GetUserUseCase {
    constructor(private readonly authRepository: AuthRepositoryInterface) { }

    async execute(): Promise<User | null> {
        try {
            const response = await this.authRepository.me();

            if (response) {
                const data = response.data;
                const userInstance = new User(data.id, data.username, data.email, data.createdAt, data.lastLogin);

                return userInstance;
            }

            return null;
        } catch (error) {
            return null;
        }
    }
}

export default GetUserUseCase;