import { Opinion, Prisma } from "@prisma/client";
import { OpinionRepositoryInterface } from "../../domain/interfaces/OpinionRepositoryInterface";
import { CreateOpinionInputs } from "../../api/dto";

type PrismaOpinionWithAnime = Prisma.OpinionGetPayload<{
    include: {
        anime: {
            include: {
                animeGenres: {
                    select: {
                        genre: {
                            select: { genreName: true }
                        }
                    }
                }
            }
        }
    }
}>;

const opGenre: PrismaOpinionWithAnime = {
    id: "opinion1",
    note: 0,
    comment: "",
    viewStatus: "En cours",
    userId: "user1",
    animeId: "1",
    anime: {
        id: "1",
        main_title: "Anime 1",
        en_title: "Anime 1 EN",
        type: "TV",
        episodes: 12,
        status: "FINISHED",
        posterUrl: "anime1.webp",
        startDate: "01/04/2026",
        endDate: "30/06/2026",
        popularity: 163502,
        synopsis: "Synopsis de l'anime 1",
        updatedAt: new Date("09-04-2026"),
        rankId: "rank_anime_1",
        scoreId: "score_anime_1",
        animeGenres: [
            {
                genre: {
                    genreName: "Action"
                }
            },
            {
                genre: {
                    genreName: "Drama"
                }
            },
            {
                genre: {
                    genreName: "Sci-fi"
                }
            }
        ]
    }
}

const op: Opinion = {
    id: "opinion1",
    note: 0,
    comment: "",
    viewStatus: "En cours",
    userId: "user1",
    animeId: "1"
}

class InMemoryOpinionRepository implements OpinionRepositoryInterface {
    async getViewOpinions(userId: string): Promise<Opinion[] | null> {
        if (userId !== "user1") return null;

        return [opGenre];
    }

    async getOpinion(animeId: string, userId: string): Promise<Opinion | null> {
        if (userId !== "user1" || animeId !== "1") return null;

        return op;
    }

    async createOpinion(animeId: string, userId: string, newData: CreateOpinionInputs): Promise<Opinion> {
        const opinion = {
            id: "opinion2",
            viewStatus: newData.viewStatus ?? "",
            note: newData.note ?? 0,
            comment: newData.comment ?? "",
            animeId,
            userId
        }

        return opinion;
    }

    async updateOpinion(id: string, newData: CreateOpinionInputs): Promise<Opinion> {
        if (id !== "opinion1") throw new Error("Une erreur est survenue");

        let opinion = {
            ...op
        }

        if (newData.viewStatus) opinion["viewStatus"] = newData.viewStatus;
        if (newData.note) opinion["note"] = newData.note;
        if (newData.comment) opinion["comment"] = newData.comment;

        return opinion;
    }
}

export default InMemoryOpinionRepository;