import axios from "axios";
import type Opinion from "../../../domain/entities/Opinion";
import type { OpinionRepositoryInterface } from "../../../interfaces/repositories/OpinionRepositoryInterface";
import { convertOpinion } from "../../../utils/convertOpinion";
import type { OpinionFormData } from "../../../typings/OpinionFormData";

class OpinionRepository implements OpinionRepositoryInterface {
    async getViewOpinion(): Promise<Opinion[] | null> {
        try {
            const response = await axios.get(`http://localhost:8000/api/opinion`, {
                withCredentials: true
            });
            // const response = await axios.get(`/api/opinion/`, {
            //     withCredentials: true
            // });

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            if (!response.data.data) return null;

            return response.data.data.map((opinion: any) => convertOpinion(opinion));
        } catch (error) {
            console.log(error)
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async getOpinion(animeId: string): Promise<Opinion | null> {
        try {
            const response = await axios.get(`http://localhost:8000/api/opinion/${animeId}`, {
                withCredentials: true
            });
            // const response = await axios.get(`/api/opinion/${animeId}`, {
            //     withCredentials: true
            // });

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            if (!response.data.data) return null;

            return convertOpinion(response.data.data);
        } catch (error) {
            console.log(error)
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async createOpinion(animeId: string, data: OpinionFormData): Promise<Opinion> {
        try {
            const response = await axios.post(`http://localhost:8000/api/opinion/${animeId}`, data, {
                withCredentials: true
            });
            // const response = await axios.post(`/api/opinion/${animeId}`, data, {
            //     withCredentials: true
            // });

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return convertOpinion(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    async updateOpinion(id: string, data: OpinionFormData): Promise<Opinion> {
        try {
            const response = await axios.patch(`http://localhost:8000/api/opinion/${id}`, data, {
                withCredentials: true
            });
            // const response = await axios.patch(`/api/opinion/${id}`, data, {
            //     withCredentials: true
            // });

            if (!response.data.success) throw new Error(response.data.error.message || "Erreur inconnue");

            return convertOpinion(response.data.data);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }
}

export default OpinionRepository;