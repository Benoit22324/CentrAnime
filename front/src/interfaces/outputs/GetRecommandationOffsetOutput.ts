import type Recommandation from "../../domain/entities/Recommandation";

export interface GetRecommandationOffsetOutput {
    recommandations: Recommandation[],
    total: number
}