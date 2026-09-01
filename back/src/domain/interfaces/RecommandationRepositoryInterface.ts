import { GetRecommandationByPageOutputs } from "../../api/dto";
import Recommandation from "../entities/Recommandation";

export interface RecommandationRepositoryInterface {
    getRecommandations(authorId: string): Promise<Recommandation[] | null>
    getRecommandationById(id: string, authorId: string): Promise<Recommandation | null>
    getRecommandationByPage(selectedPage: number, maxItems: number, userId?: string): Promise<GetRecommandationByPageOutputs | null>
    createRecommandation(authorId: string, title: string, description: string): Promise<void>
    addFavorite(id: string, userId: string): Promise<Recommandation | null>
    addLike(id: string, userId: string): Promise<Recommandation | null>
    addAnime(id: string, animeId: string, authorId: string): Promise<Recommandation | null>
    updateRecommandation(id: string, title: string, description: string, authorId: string): Promise<Recommandation>
    removeAnime(id: string): Promise<void>
    removeFavorite(id: string): Promise<void>
    removeLike(id: string): Promise<void>
    deleteRecommandation(id: string, authorId: string): Promise<void>
}