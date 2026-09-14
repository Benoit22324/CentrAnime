import GetAnimeByIdUseCase from "../../application/usecases/GetAnimeByIdUseCase";
import Anime from "../../domain/entities/Anime";
import InMemoryAnimeRepository from "../../infrastructure/repositories/InMemoryAnimeRepository"

describe("GetAnimeByIdUseCase", () => {
    let repository: InMemoryAnimeRepository;
    let usecase: GetAnimeByIdUseCase;

    beforeEach(() => {
        repository = new InMemoryAnimeRepository();
        usecase = new GetAnimeByIdUseCase(repository);
    });

    it("should throw an error", async () => {
        await expect(usecase.execute("")).rejects.toThrow("Anime introuvable");
    })

    it("should return a value", async () => {
        await expect(usecase.execute("1")).resolves.toBeDefined();
    })

    it("should return a value type of Anime entity", async () => {
        const res = await usecase.execute("1");

        expect(res instanceof Anime).toBeTruthy();
    })
})