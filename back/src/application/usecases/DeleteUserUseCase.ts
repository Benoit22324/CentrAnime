import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(id: string): Promise<void> {
        try {
            await this.userRepository.deleteUser(id);
        } catch (err) {
            throw new Error("Identifiants invalide");
        }
    }
}

export default DeleteUserUseCase;