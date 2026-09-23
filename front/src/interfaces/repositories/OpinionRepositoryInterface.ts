import type Opinion from "../../domain/entities/Opinion";
import type { OpinionFormData } from "../../typings/OpinionFormData";

export interface OpinionRepositoryInterface {
    getViewOpinion(): Promise<Opinion[] | null>
    getOpinion(animeId: string): Promise<Opinion | null>
    createOpinion(animeId: string, data: OpinionFormData): Promise<Opinion>
    updateOpinion(id: string, data: OpinionFormData): Promise<Opinion>
}