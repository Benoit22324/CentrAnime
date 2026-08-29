import { Opinion } from "@prisma/client";
import { CreateOpinionInputs } from "../../api/dto";

export interface OpinionRepositoryInterface {
    getOpinion(animeId: string, userId: string): Promise<Opinion | null>
    createOpinion(animeId: string, userId: string, newData: CreateOpinionInputs): Promise<Opinion>
    updateOpinion(id: string, newData: CreateOpinionInputs): Promise<Opinion>
}