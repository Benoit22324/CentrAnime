import Recommandation from "../../domain/entities/Recommandation";

export interface CreateRecommandationInputs {
    title: string,
    description: string
}

export interface GetRecommandationByPageOutputs {
    recommandations: Recommandation[],
    total: number
}