import type { AuthRepositoryInterface } from "../../interfaces/repositories/AuthRepositoryInterface";
import type { RegisterFormData } from "../../typings/RegisterFormData";

class RegisterUseCase {
    constructor(private readonly authRepository: AuthRepositoryInterface) { }

    async execute(payload: RegisterFormData): Promise<string | void> {
        try {
            const res = await this.authRepository.register(payload);

            if (res && !res.success && res.error) return res.error.message
        } catch(err) {
            console.error(err)
            throw new Error("Une erreur est survenue");
        }
    }
}

export default RegisterUseCase;