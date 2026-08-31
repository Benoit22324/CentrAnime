import axios from "axios";
import type AnimeList from "../../../domain/entities/AnimeList";
import type { AnimeListRepositoryInterface } from "../../../interfaces/repositories/AnimeListRepositoryInterface";
import { convertAnimeList } from "../../../utils/convertAnimeList";
import type { GetAnimeListOffsetOutput } from "../../../interfaces/outputs/GetAnimeListOffsetOutput";

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

    async getAnimeListOffset(selectedPage: number, maxItems: number): Promise<GetAnimeListOffsetOutput> {
        try {
            const response = await axios.get(`http://localhost:8000/api/anilist/offset?selectedPage=${selectedPage}&maxItems=${maxItems}`, {
                withCredentials: true
            })
            // const response = await axios.get(`/api/anilist/offset?selectedPage=${selectedPage}&maxItems=${maxItems}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (response.data.data.length === 0) {
                return {
                    animeLists: [],
                    total: 0
                };
            }

            return {
                ...response.data.data,
                animeLists: response.data.data.animeLists.map((al: any) => convertAnimeList(al))
            }
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async getAnimeListById(id: string): Promise<AnimeList | null> {
        try {
            const response = await axios.get(`http://localhost:8000/api/anilist/${id}`, {
                withCredentials: true
            })
            // const response = await axios.get(`/api/anilist/${id}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data) return null;

            return convertAnimeList(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async createAnimeList(title: string): Promise<void> {
        try {
            const response = await axios.post(`http://localhost:8000/api/anilist/`, { title }, {
                withCredentials: true
            })
            // const response = await axios.post(`/api/anilist/`, { title }, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
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

    async updateAnimeList(id: string, title: string): Promise<AnimeList | null> {
        try {
            const response = await axios.patch(`http://localhost:8000/api/anilist/${id}`, { title }, {
                withCredentials: true
            })
            // const response = await axios.patch(`/api/anilist/${id}}`, { title }, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data) return null;

            return convertAnimeList(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async removeAnimeAL(id: string): Promise<void> {
        try {
            const response = await axios.delete(`http://localhost:8000/api/anilist/anime/${id}`, {
                withCredentials: true
            })
            // const response = await axios.delete(`/api/anilist/anime/${id}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async deleteAnimeList(id: string): Promise<void> {
        try {
            const response = await axios.delete(`http://localhost:8000/api/anilist/${id}`, {
                withCredentials: true
            })
            // const response = await axios.delete(`/api/anilist/${id}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default AnimeListRepository;