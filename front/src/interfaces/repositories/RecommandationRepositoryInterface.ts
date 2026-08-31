import type Recommandation from "../../domain/entities/Recommandation"
import type { GetRecommandationOffsetOutput } from "../outputs/GetRecommandationOffsetOutput"

export interface RecommandationRepositoryInterface {
    getRecommandations(): Promise<Recommandation[] | null>
    getRecommandationOffset(selectedPage: number, maxItems: number): Promise<GetRecommandationOffsetOutput>
    getRecommandationById(id: string): Promise<Recommandation | null>
    createRecommandation(title: string, description: string): Promise<void>
    addAnimeReco(recoId: string, animeId: string): Promise<Recommandation | null>
    updateRecommandation(id: string, title: string, description: string): Promise<Recommandation | null>
    removeAnimeReco(id: string): Promise<void>
    deleteRecommandation(id: string): Promise<void>
}