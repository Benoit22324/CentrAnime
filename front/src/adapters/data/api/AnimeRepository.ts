import axios from "axios";
import type { AnimeRepositoryInterface } from "../../../interfaces/repositories/AnimeRepositoryInterface";
import { convertAnime } from "../../../utils/convertAnime";
import type { GetAnimeOffsetOutput } from "../../../interfaces/outputs/GetAnimeOffsetOutput";
import type Anime from "../../../domain/entities/Anime";

class AnimeRepository implements AnimeRepositoryInterface {
    async getAnimeOffset(selectedPage: number, maxItems: number, searchName: string, filterGenre: string): Promise<GetAnimeOffsetOutput> {
        try {
            // Appel à l'API avec les données sous forme de query
            const response = await axios.get(`http://localhost:8000/api/anime/offset?selectedPage=${selectedPage}&maxItems=${maxItems}${searchName ? `&searchName=${searchName}` : ""}${filterGenre ? `&filterGenre=${filterGenre}` : ""}`);
            // const response = await axios.get(`/api/anime/offset?selectedPage=${selectedPage}&maxItems=${maxItems}${searchName ? `&searchName=${searchName}` : ""}${filterGenre ? `&filterGenre=${filterGenre}` : ""}`);

            // Retourner une erreur en cas d'échec
            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            // Retourner le total (avec la déstructuration de response.data.data) et les animes
            return {
                ...response.data.data,
                // Conversion des animes récupérés en entité/classe Anime
                animes: response.data.data.animes.map((anime: any) => convertAnime(anime))
            }
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async getAnimeById(id: string): Promise<Anime> {
        try {
            const response = await axios.get(`http://localhost:8000/api/anime/${id}`);
            // const response = await axios.get(`/api/anime/${id}`);

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return convertAnime(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AnimeRepository;