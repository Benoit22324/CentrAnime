import Recommandation from "../domain/entities/Recommandation"

export const convertRecommandation = (reco: any) => {
    return new Recommandation(
        reco.id,
        reco.title,
        reco.description,
        reco.animes,
        reco.author
    )
}