import axios from "axios";
import type { UserRepositoryInterface } from "../../../interfaces/repositories/UserRepositoryInterface";
import type { RepositoryOutput } from "../../../interfaces/outputs/RepositoryOutput";

class UserRepository implements UserRepositoryInterface {
    async updateUser(username: string): Promise<RepositoryOutput> {
        try {
            const response = await axios.patch("http://localhost:8000/api/user", { username }, {
                withCredentials: true
            });
            // const response = await axios.patch("/api/user", { username }, {
            //     withCredentials: true
            // });

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return response.data;
        } catch(error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) return error.response.data;

            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async deleteUser(): Promise<void> {
        try {
            const response = await axios.delete("http://localhost:8000/api/user", {
                withCredentials: true
            });
            // const response = await axios.delete("/api/user", {
            //     withCredentials: true
            // });

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch(error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) return error.response.data;

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default UserRepository;