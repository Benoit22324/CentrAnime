import type { UserRepositoryInterface } from "../../interfaces/repositories/UserRepositoryInterface";

class DeleteUserUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(): Promise<void> {
        try {
            await this.userRepository.deleteUser();
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }
}

export default DeleteUserUseCase;