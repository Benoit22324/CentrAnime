import { UserPayload } from "../../api/dto";
import { sanitizeUser } from "../../api/utility";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(id: string, username: string): Promise<UserPayload | null> {
        try {
            const user = await this.userRepository.updateUser(id, username);

            if (!user) return null;

            return sanitizeUser(user)
        } catch (err) {
            throw new Error("Identifiants invalide");
        }
    }
}

export default UpdateUserUseCase;