import { GetRecommandationByPageOutputs } from "../../api/dto";
import Recommandation from "../entities/Recommandation";

export interface RecommandationRepositoryInterface {
    getRecommandations(authorId: string): Promise<Recommandation[] | null>
    getRecommandationById(id: string, authorId: string): Promise<Recommandation | null>
    getRecommandationByPage(selectedPage: number, maxItems: number): Promise<GetRecommandationByPageOutputs | null>
    createRecommandation(authorId: string, title: string, description: string): Promise<void>
    addAnime(id: string, animeId: string): Promise<Recommandation | null>
    updateRecommandation(id: string, title: string, description: string): Promise<Recommandation>
    removeAnime(id: string): Promise<void>
    deleteRecommandation(id: string, authorId: string): Promise<void>
}