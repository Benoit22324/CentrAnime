import GetGenresUseCase from "../../application/usecases/GetGenresUseCase";
import InMemoryGenreRepository from "../../infrastructure/repositories/InMemoryGenreRepository";

const g = [
    {
        id: "genre1",
        genreName: "Comedy"
    },
    {
        id: "genre2",
        genreName: "Drama"
    },
    {
        id: "genre3",
        genreName: "Thriller"
    }
]

describe("GetGenresUseCase", () => {
    let repository: InMemoryGenreRepository;
    let usecase: GetGenresUseCase;

    beforeEach(() => {
        repository = new InMemoryGenreRepository();
        usecase = new GetGenresUseCase(repository);
    })

    it("should return an array of genres", async () => {
        const res = await usecase.execute();

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual(g);
        }
    })
})