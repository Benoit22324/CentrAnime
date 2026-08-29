import axios from "axios";
import type { AuthRepositoryInterface } from "../../../interfaces/repositories/AuthRepositoryInterface";
import type { RegisterFormData } from "../../../typings/RegisterFormData";
import type { LoginFormData } from "../../../typings/LoginFormData";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

class AuthRepository implements AuthRepositoryInterface {
    async login(payload: LoginFormData): Promise<RepositoryOutput> {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/login", payload, {
                withCredentials: true
            });
            // const response = await axios.post("/api/auth/login", payload, {
            //     withCredentials: true
            // });

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) return error.response.data;

            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async register(payload: RegisterFormData): Promise<RepositoryOutput | void> {
        try {
            const response = await axios.post("http://localhost:8000/api/auth/register", payload);
            // const response = await axios.post("/api/auth/register", payload);

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) return error.response.data;

            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async logout(): Promise<void> {
        await axios.get("http://localhost:8000/api/auth/logout", {
            withCredentials: true
        });
        // await axios.get("/api/auth/logout", {
        //     withCredentials: true
        // });
    }
}

export default AuthRepository;