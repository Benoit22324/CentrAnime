import { UserPayload } from "../../api/dto";
import { isValidPassword, sanitizeUser } from "../../api/utility";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";

class LoginUseCase {
    constructor(private readonly userRepository: UserRepositoryInterface) { }

    async execute(email: string, password: string): Promise<UserPayload> {
        if (!email) throw new Error("L'email est requis");
        if (!password) throw new Error("Le mot de passe est requis");

        try {
            const user = await this.userRepository.login(email);
            const isValid = await isValidPassword(password, user.password, user.salt);

            if (!isValid) throw new Error("Identifiants invalide");

            return sanitizeUser(user);
        } catch (err) {
            throw new Error("Identifiants invalide");
        }
    }
}

export default LoginUseCase;