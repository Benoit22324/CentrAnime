import { sanitizeUser } from "../../api/utility";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";
import { UserPayload } from "../../api/dto";

class GetUserByIdUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(id: string): Promise<UserPayload | null> {
        if (!id) return null;

        try {
            const user = await this.userRepository.getUserById(id);

            if (!user) return null;

            return sanitizeUser(user);
        } catch (error) {
            throw new Error("Utilisateur introuvable");
        }
    }
}

export default GetUserByIdUseCase;