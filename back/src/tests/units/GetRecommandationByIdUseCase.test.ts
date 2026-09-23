import { Recommandation as PrismaRecommandation } from "@prisma/client";
import { sanitizeRecommandation } from "../../api/utility";
import GetRecommandationByIdUseCase from "../../application/usecases/GetRecommandationByIdUseCase";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";
import Recommandation from "../../domain/entities/Recommandation";

const reco = sanitizeRecommandation({
    id: "reco1",
    title: "Isekai de saison",
    description: "Voici des isekais",
    recommandationAnimes: [
        {
            id: "ra1",
            anime: {
                id: "1",
                main_title: "Anime 1"
            }
        },
        {
            id: "ra2",
            anime: {
                id: "2",
                main_title: "Anime 2"
            }
        }
    ],
    authorId: "user2",
    author: {
        username: "GoodAnime"
    },
    favorites: [
        {
            id: "fav1"
        }
    ],
    likes: [
        {
            id: "like1"
        }
    ],
    _count: {
        favorites: 3,
        likes: 2
    }
} as PrismaRecommandation, true)

describe("GetRecommandationByIdUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: GetRecommandationByIdUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new GetRecommandationByIdUseCase(repository);
    })

    it("should return null with wrong userId and recoId", async () => {
        const res = await usecase.execute("reco9", "user9");

        expect(res).toBeNull();
    })

    it("should return null with wrong userId", async () => {
        const res = await usecase.execute("reco1", "user9");

        expect(res).toBeNull();
    })

    it("should return null with wrong recoId", async () => {
        const res = await usecase.execute("reco9", "user2");

        expect(res).toBeNull();
    })

    it("should return Opinion", async () => {
        const res = await usecase.execute("reco1", "user2");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual(reco);
            expect(res).toBeInstanceOf(Recommandation);
        }
    })
})