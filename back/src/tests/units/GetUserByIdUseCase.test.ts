import GetUserByIdUseCase from "../../application/usecases/GetUserByIdUseCase";
import InMemoryUserRepository from "../../infrastructure/repositories/InMemoryUserRepository";

const u = {
    id: "user1",
    username: "AnimeFan",
    email: "user1@gmail.com",
    createdAt: new Date("09-22-2026"),
    lastLogin: new Date("09-22-2026")
}

describe("GetUserByIdUseCase", () => {
    let repository: InMemoryUserRepository;
    let usecase: GetUserByIdUseCase;

    beforeEach(() => {
        repository = new InMemoryUserRepository();
        usecase = new GetUserByIdUseCase(repository);
    })

    it("should return null with empty userId", async () => {
        const res = await usecase.execute(" ");

        expect(res).toBeNull();
    })

    it("should return null with wrong userId", async () => {
        const res = await usecase.execute("user13");

        expect(res).toBeNull();
    })

    it("should return User payload", async () => {
        const res = await usecase.execute("user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual(u);
        }
    })
})