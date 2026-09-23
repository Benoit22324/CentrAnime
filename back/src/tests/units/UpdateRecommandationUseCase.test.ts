import { sanitizeRecommandation } from "../../api/utility";
import UpdateRecommandationUseCase from "../../application/usecases/UpdateRecommandationUseCase";
import Recommandation from "../../domain/entities/Recommandation";
import InMemoryRecommandationRepository from "../../infrastructure/repositories/InMemoryRecommandationRepository";

const r = {
    id: "reco2",
    title: "Drama de saison",
    description: "Voici des animes full drama",
    recommandationAnimes: [
        {
            id: "ra3",
            anime: {
                id: "3",
                main_title: "Anime 3"
            }
        }
    ],
    authorId: "user2",
    author: {
        username: "GoodAnime"
    }
}

describe("UpdateRecommandationUseCase", () => {
    let repository: InMemoryRecommandationRepository;
    let usecase: UpdateRecommandationUseCase;

    beforeEach(() => {
        repository = new InMemoryRecommandationRepository();
        usecase = new UpdateRecommandationUseCase(repository);
    })

    it("should throw an error 'Le titre est requis' with an empty title", async () => {
        await expect(usecase.execute("reco2", "", "Voici des animes full drama", "user2")).rejects.toThrow("Le titre est requis");
    })

    it("should throw an error 'La description est requise' with an empty description", async () => {
        await expect(usecase.execute("reco2", "Drama de saison", "", "user2")).rejects.toThrow("La description est requise");
    })

    it("should throw an error 'Une erreur est survenue' with unknown id", async () => {
        await expect(usecase.execute("reco9", "Drama de saison", "Voici des animes full drama", "user2")).rejects.toThrow("Une erreur est survenue");
    })

    it("should return an updated Recommandation", async () => {
        const res = await usecase.execute("reco2", "Drama de saison", "Voici des animes full drama", "user2");

        expect(res).toBeDefined();
        expect(res).toEqual(sanitizeRecommandation(r, r.authorId == "user2"));
        expect(res).toBeInstanceOf(Recommandation);
    })
})