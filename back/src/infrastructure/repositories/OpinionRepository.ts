import { Opinion } from "@prisma/client";
import { OpinionRepositoryInterface } from "../../domain/interfaces/OpinionRepositoryInterface";
import { prisma } from "../../api/config/client";
import { CreateOpinionInputs } from "../../api/dto";

class OpinionRepository implements OpinionRepositoryInterface {
    async getViewOpinions(userId: string): Promise<Opinion[] | null> {
        const opinions = await prisma.opinion.findMany({
            where: {
                userId,
                viewStatus: { not: { equals: "" } }
            },
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
        });

        return opinions;
    }

    async getOpinion(animeId: string, userId: string): Promise<Opinion | null> {
        const opinion = await prisma.opinion.findFirst({
            where: {
                animeId,
                userId
            }
        });

        return opinion
    }

    async createOpinion(animeId: string, userId: string, newData: CreateOpinionInputs): Promise<Opinion> {
        const opinion = await prisma.opinion.create({
            data: {
                viewStatus: newData.viewStatus ?? "",
                note: newData.note ?? 0,
                comment: newData.comment ?? "",
                animeId,
                userId
            }
        });

        return opinion;
    }

    async updateOpinion(id: string, newData: CreateOpinionInputs): Promise<Opinion> {
        const opinion = await prisma.opinion.update({
            where: { id },
            data: {
                viewStatus: newData.viewStatus ?? "",
                note: newData.note ?? 0,
                comment: newData.comment ?? ""
            }
        });

        return opinion;
    }
}

export default OpinionRepository;