import axios from "axios";
import type { RecommandationRepositoryInterface } from "../../../interfaces/repositories/RecommandationRepositoryInterface";
import type Recommandation from "../../../domain/entities/Recommandation";
import type { GetRecommandationOffsetOutput } from "../../../interfaces/outputs/GetRecommandationOffsetOutput";
import { convertRecommandation } from "../../../utils/convertRecommandation";

class RecommandationRepository implements RecommandationRepositoryInterface {
    async getRecommandations(): Promise<Recommandation[] | null> {
        try {
            const response = await axios.get("http://localhost:8000/api/reco", {
                withCredentials: true
            })
            // const response = await axios.get("/api/reco", {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (response.data.data.length === 0) return null;

            return response.data.data.map((reco: any) => convertRecommandation(reco));
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async getRecommandationOffset(selectedPage: number, maxItems: number): Promise<GetRecommandationOffsetOutput> {
        try {
            const response = await axios.get(`http://localhost:8000/api/reco/offset?selectedPage=${selectedPage}&maxItems=${maxItems}`)
            // const response = await axios.get(`/api/reco/offset?selectedPage=${selectedPage}&maxItems=${maxItems}`)

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (response.data.data.length === 0) {
                return {
                    recommandations: [],
                    total: 0
                };
            }

            return {
                ...response.data.data,
                recommandations: response.data.data.recommandations.map((reco: any) => convertRecommandation(reco))
            }
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async getRecommandationById(id: string): Promise<Recommandation | null> {
        try {
            const response = await axios.get(`http://localhost:8000/api/reco/${id}`, {
                withCredentials: true
            })
            // const response = await axios.get(`/api/reco/${id}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data) return null;

            return convertRecommandation(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async createRecommandation(title: string, description: string): Promise<void> {
        try {
            const response = await axios.post(`http://localhost:8000/api/reco`, { title, description }, {
                withCredentials: true
            })
            // const response = await axios.post(`/api/reco`, { title, description }, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async addAnimeReco(recoId: string, animeId: string): Promise<Recommandation | null> {
        try {
            const response = await axios.post(`http://localhost:8000/api/reco/anime/${recoId}?animeId=${animeId}`, {}, {
                withCredentials: true
            })
            // const response = await axios.post(`/api/reco/anime/${recoId}?animeId=${animeId}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data) return null;

            return convertRecommandation(response.data.data)
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async updateRecommandation(id: string, title: string, description: string): Promise<Recommandation | null> {
        try {
            const response = await axios.patch(`http://localhost:8000/api/reco/${id}`, { title, description }, {
                withCredentials: true
            })
            // const response = await axios.patch(`/api/reco/${id}}`, { title, description }, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
            if (!response.data.data) return null;

            return convertRecommandation(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async removeAnimeReco(id: string): Promise<void> {
        try {
            const response = await axios.delete(`http://localhost:8000/api/reco/anime/${id}`, {
                withCredentials: true
            })
            // const response = await axios.delete(`/api/reco/anime/${id}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async deleteRecommandation(id: string): Promise<void> {
        try {
            const response = await axios.delete(`http://localhost:8000/api/reco/${id}`, {
                withCredentials: true
            })
            // const response = await axios.delete(`/api/reco/${id}`, {
            //     withCredentials: true
            // })

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default RecommandationRepository;