import type { UpdateUserInput } from "../../interfaces/inputs/UpdateUserInput";
import type { UserRepositoryInterface } from "../../interfaces/repositories/UserRepositoryInterface";
import User from "../entities/User";

class UpdateUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(input: UpdateUserInput): Promise<User | null> {
        const { username } = input;

        try {
            const response = await this.userRepository.updateUser(username);

            if (response && response.success && response.data) {
                const data = response.data;
                const userInstance = new User(data.id, data.username, data.email, data.createdAt, data.lastLogin);

                return userInstance;
            }

            return null;
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default UpdateUserUseCase;