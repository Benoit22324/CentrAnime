import { prisma } from "../../api/config/client";
import { RecommandationRepositoryInterface } from "../../domain/interfaces/RecommandationRepositoryInterface";
import { sanitizeRecommandation } from "../../api/utility";
import Recommandation from "../../domain/entities/Recommandation";
import { GetRecommandationByPageOutputs } from "../../api/dto";
import { Prisma } from "@prisma/client";

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
                },
                favorites: {
                    where: { userId: authorId },
                    select: { id: true }
                },
                likes: {
                    where: { userId: authorId },
                    select: { id: true }
                },
                _count: {
                    select: {
                        favorites: true,
                        likes: true
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
                },
                favorites: {
                    where: { userId: authorId },
                    select: { id: true }
                },
                likes: {
                    where: { userId: authorId },
                    select: { id: true }
                },
                _count: {
                    select: {
                        favorites: true,
                        likes: true
                    }
                }
            }
        });

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation);
    }

    async getRecommandationByPage(selectedPage: number, maxItems: number, userId?: string): Promise<GetRecommandationByPageOutputs | null> {
        const include: Prisma.RecommandationInclude = {
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
            },
            _count: {
                select: {
                    favorites: true,
                    likes: true
                }
            }
        }

        if (userId !== undefined) {
            include.favorites = {
                where: { userId },
                select: { id: true }
            }
            include.likes = {
                where: { userId },
                select: { id: true }
            }
        }

        const recommandations = await prisma.recommandation.findMany({
            include,
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

    async addFavorite(id: string, userId: string): Promise<Recommandation | null> {
        await prisma.favorite.create({
            data: {
                recoId: id,
                userId
            }
        });

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
                },
                favorites: {
                    where: { userId },
                    select: { id: true }
                },
                likes: {
                    where: { userId },
                    select: { id: true }
                },
                _count: {
                    select: {
                        favorites: true,
                        likes: true
                    }
                }
            }
        });

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation);
    }

    async addLike(id: string, userId: string): Promise<Recommandation | null> {
        await prisma.like.create({
            data: {
                recoId: id,
                userId
            }
        });

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
                },
                favorites: {
                    where: { userId },
                    select: { id: true }
                },
                likes: {
                    where: { userId },
                    select: { id: true }
                },
                _count: {
                    select: {
                        favorites: true,
                        likes: true
                    }
                }
            }
        });

        if (!recommandation) return null;

        return sanitizeRecommandation(recommandation);
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
        });
    }

    async removeFavorite(id: string): Promise<void> {
        await prisma.favorite.delete({
            where: { id }
        });
    }

    async removeLike(id: string): Promise<void> {
        await prisma.like.delete({
            where: { id }
        });
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