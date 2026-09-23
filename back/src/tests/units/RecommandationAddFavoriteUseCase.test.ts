import { sanitizeRecommandation } from "../../api/utility";
import RecommandationAddFavoriteUseCase from "../../application/usecases/RecommandationAddFavoriteUseCase";
import Recommandation from "../../domain/entities/Recommandation";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

const r = {
    id: "reco2",
    title: "Fantasy de saison",
    description: "Voici des animes fantasy",
    recommandationAnimes: [
        {
            id: "ra3",
            anime: {
                id: "3",
                main_title: "Anime 3"
            }
        }
    ],
    favorites: [
        {
            id: "fav3"
        }
    ],
    authorId: "user2",
    author: {
        username: "GoodAnime"
    },
    _count: {
        favorites: 5,
        likes: 3
    }
}

describe("RecommandationAddFavoriteUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: RecommandationAddFavoriteUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new RecommandationAddFavoriteUseCase(repository);
    })

    it("should return null with unknown recoId and userId", async () => {
        const res = await usecase.execute("reco6", "user9");

        expect(res).toBeNull();
    })

    it("should return null with unknown userId", async () => {
        const res = await usecase.execute("reco2", "user9");

        expect(res).toBeNull();
    })

    it("should return null with unknown recoId", async () => {
        const res = await usecase.execute("reco6", "user2");

        expect(res).toBeNull();
    })

    it("should return an updated Recommandation", async () => {
        const res = await usecase.execute("reco2", "user2");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual(sanitizeRecommandation(r, r.authorId === "user2"));
            expect(res).toBeInstanceOf(Recommandation);
        }
    })
})