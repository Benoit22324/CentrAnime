import { prisma } from "../../api/config/client";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";
import { sanitizeRecommandation } from "../../api/utility";
import Recommandation from "../../domain/entities/Recommandation";
import { GetRecommandationByPageOutputs } from "../../api/dto";

class RecommandationRepository implements RecommandationRepositoryInterface {
    async getRecommandations(authorId: string): Promise<Recommandation[] | null> {
        const recommandations = await prisma.recommandation.findMany({
            where: { authorId },
            include: {
                recommandationAnimes: {
                    select: {
                        id: true,
                        anime: {
                            select: {
                                id: true,
                                main_title: true
                            }
                        }
                    }
                },
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if (!recommandations) return null;

        return recommandations.map(al => sanitizeRecommandation(al));
    }

    async getRecommandationById(id: string, authorId: string): Promise<Recommandation | null> {
        const recommandation = await prisma.recommandation.findUnique({
            where: {
                id,
                authorId
            },
            include: {
                recommandationAnimes: {
                    select: {
                        id: true,
                        anime: {
                            select: {
                                id: true,
                                main_title: true
                            }
                        }
                    }
                },
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation);
    }

    async getRecommandationByPage(selectedPage: number, maxItems: number): Promise<GetRecommandationByPageOutputs | null> {
        const recommandations = await prisma.recommandation.findMany({
            include: {
                recommandationAnimes: {
                    select: {
                        id: true,
                        anime: {
                            select: {
                                id: true,
                                main_title: true
                            }
                        }
                    }
                },
                author: {
                    select: {
                        username: true
                    }
                }
            },
            take: maxItems,
            skip: maxItems * selectedPage,
        });
        
        const totalList = await prisma.recommandation.count() / maxItems

        if (!recommandations) return null;

        return {
            recommandations: recommandations.map(reco => sanitizeRecommandation(reco)),
            total: Math.ceil(totalList)
        }
    }

    async createRecommandation(authorId: string, title: string, description: string): Promise<void> {
        await prisma.recommandation.create({
            data: {
                title,
                description,
                authorId
            }
        });
    }

    async addAnime(id: string, animeId: string): Promise<Recommandation | null> {
        await prisma.recommandationAnime.create({
            data: {
                recoId: id,
                animeId
            }
        })

        const recommandation = await prisma.recommandation.findUnique({
            where: { id },
            include: {
                recommandationAnimes: {
                    select: {
                        id: true,
                        anime: {
                            select: {
                                id: true,
                                main_title: true
                            }
                        }
                    }
                },
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation);
    }

    async updateRecommandation(id: string, title: string, description: string): Promise<Recommandation> {
        const recommandation = await prisma.recommandation.update({
            where: { id },
            data: {
                title,
                description
            },
            include: {
                recommandationAnimes: {
                    select: {
                        id: true,
                        anime: {
                            select: {
                                id: true,
                                main_title: true
                            }
                        }
                    }
                },
                author: {
                    select: {
                        username: true
                    }
                }
            }
        });

        return sanitizeRecommandation(recommandation);
    }

    async removeAnime(id: string): Promise<void> {
        await prisma.recommandationAnime.delete({
            where: { id }
        })
    }

    async deleteRecommandation(id: string, authorId: string): Promise<void> {
        await prisma.recommandationAnime.deleteMany({
            where: {
                recoId: id
            }
        });

        await prisma.recommandation.delete({
            where: {
                id,
                authorId
            }
        });
    }
}

export default RecommandationRepository;