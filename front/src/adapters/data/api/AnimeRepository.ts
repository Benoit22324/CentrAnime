import axios from "axios";
import type { AnimeRepositoryInterface } from "../../../interfaces/repositories/AnimeRepositoryInterface";

class AnimeRepository implements AnimeRepositoryInterface {
    async getAnimeOffset(selectedPage: number, maxItems: number, searchName: string, filterGenre: string): Promise<void> {
        try {
            // const response = await axios.post(`http://localhost:8000/api/anime/offset?selectedPage=${selectedPage}&maxItems=${maxItems}${searchName ? `&searchName=${searchName}` : ""}${filterGenre ? `&filterGenre=${filterGenre}` : ""}`);
            const response = await axios.get(`/api/anime/offset?selectedPage=${selectedPage}&maxItems=${maxItems}${searchName ? `&searchName=${searchName}` : ""}${filterGenre ? `&filterGenre=${filterGenre}` : ""}`);

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return response.data
        } catch (error) {
            if (axios.isAxiosError(error) && error.response?.data.error.message) return error.response.data;

            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AnimeRepository;