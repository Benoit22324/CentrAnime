import { Opinion } from "@prisma/client";
import { CreateOpinionInputs } from "../../api/dto";

export interface OpinionRepositoryInterface {
    getViewOpinions(userId: string): Promise<Opinion[] | null>
    getOpinion(animeId: string, userId: string): Promise<Opinion | null>
    createOpinion(animeId: string, userId: string, newData: CreateOpinionInputs): Promise<Opinion>
    updateOpinion(id: string, newData: CreateOpinionInputs): Promise<Opinion>
}