import Opinion from "../domain/entities/Opinion"

export const convertOpinion = (opinion: any) => {
    return new Opinion(
        opinion.id,
        opinion.viewStatus,
        opinion.note,
        opinion.comment
    )
}