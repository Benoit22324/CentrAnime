import Opinion from "../domain/entities/Opinion"
import { convertAnime } from "./convertAnime"

export const convertOpinion = (opinion: any) => {
    return new Opinion(
        opinion.id,
        opinion.viewStatus,
        opinion.note,
        opinion.comment,
        opinion.anime ? convertAnime(opinion.anime) : undefined
    )
}