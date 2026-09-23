import { Contact as PrismaContact } from "@prisma/client";
import { sanitizeContact } from "../../api/utility";
import GetContactsUseCase from "../../application/usecases/GetContactsUseCase";
import InMemoryContactRepository from "../../infrastructure/repositories/InMemoryContactRepository";
import Contact from "../../domain/entities/Contact";

const c = sanitizeContact({
    id: "contact1",
    userAId: "user1",
    userBId: "user2",
    userA: {
        username: "AnimeFan"
    },
    userB: {
        username: "GoodAnime"
    },
    chat: {
        id: "chat1"
    }
} as PrismaContact, "user1")

describe("GetContactsUseCase", () => {
    let repository: InMemoryContactRepository;
    let usecase: GetContactsUseCase;

    beforeEach(() => {
        repository = new InMemoryContactRepository();
        usecase = new GetContactsUseCase(repository);
    })

    it("should return an empty array", async () => {
        const res = await usecase.execute("user3");

        expect(res).toBeDefined();
        expect(res).toEqual([]);
    })

    it("should return an array of contacts", async () => {
        const res = await usecase.execute("user1");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual([c]);
            expect(res[0] instanceof Contact).toBeTruthy();
        }
    })
})