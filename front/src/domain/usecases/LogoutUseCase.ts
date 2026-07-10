import type { AuthRepositoryInterface } from "../../interfaces/repositories/AuthRepositoryInterface";

class LogoutUseCase {
    constructor(private readonly authRepository: AuthRepositoryInterface) { }

    async execute(): Promise<void> {
        await this.authRepository.logout();
    }
}

export default LogoutUseCase;