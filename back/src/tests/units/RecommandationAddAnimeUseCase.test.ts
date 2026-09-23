import { sanitizeRecommandation } from "../../api/utility";
import RecommandationAddAnimeUseCase from "../../application/usecases/RecommandationAddAnimeUseCase";
import Recommandation from "../../domain/entities/Recommandation";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

const r = {
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
        },
        {
            id: "ra4",
            anime: {
                id: "80",
                main_title: "New Anime"
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
}

describe("RecommandationAddAnimeUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: RecommandationAddAnimeUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new RecommandationAddAnimeUseCase(repository);
    })

    it("should return null with wrong userId", async () => {
        const res = await usecase.execute("reco1", "80", "user9");

        expect(res).toBeNull();
    })

    it("should return null with no recoId identified", async () => {
        const res = await usecase.execute("reco6", "80", "user2");

        expect(res).toBeNull();
    })

    it("should return an updated Recommandation", async () => {
        const res = await usecase.execute("reco1", "80", "user2");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual(sanitizeRecommandation(r, r.authorId === "user2"));
            expect(res).toBeInstanceOf(Recommandation);
        }
    })
})