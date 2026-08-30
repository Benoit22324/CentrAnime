import axios from "axios";
import type AnimeList from "../../../domain/entities/AnimeList";
import type { AnimeListRepositoryInterface } from "../../../interfaces/repositories/AnimeListRepositoryInterface";
import { convertAnimeList } from "../../../utils/convertAnimeList";

class AnimeListRepository implements AnimeListRepositoryInterface {
    async getAnimeLists(): Promise<AnimeList[] | null> {
        try {
            const response = await axios.get("http://localhost:8000/api/anilist", {
                withCredentials: true
            })
            // const response = await axios.get("/api/anilist", {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (response.data.data.length === 0) return null;

            return response.data.data.map((al: any) => convertAnimeList(al));
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async addAnimeAL(anilistId: string, animeId: string): Promise<AnimeList | null> {
        try {
            const response = await axios.post(`http://localhost:8000/api/anilist/anime/${anilistId}?animeId=${animeId}`, {}, {
                withCredentials: true
            })
            // const response = await axios.post(`/api/anilist/anime/${anilistId}?animeId=${animeId}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data) return null;

            return convertAnimeList(response.data.data)
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AnimeListRepository;