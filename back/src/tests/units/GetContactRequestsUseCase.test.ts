import { ContactRequest as PrismaContactRequest } from "@prisma/client";
import { sanitizeContactRequest } from "../../api/utility";
import GetContactRequestsUseCase from "../../application/usecases/GetContactRequestsUseCase";
import InMemoryContactRequestRepository from "../../infrastructure/repositories/InMemoryContactRequestRepository";
import ContactRequest from "../../domain/entities/ContactRequest";

const cr = sanitizeContactRequest({
    id: "cr1",
    senderId: "user1",
    receiverId: "user4",
    createdAt: new Date("09-20-2026"),
    sender: {
        username: "AnimeFan"
    }
} as PrismaContactRequest)

describe("GetContactRequestsUseCase", () => {
    let repository: InMemoryContactRequestRepository;
    let usecase: GetContactRequestsUseCase;

    beforeEach(() => {
        repository = new InMemoryContactRequestRepository();
        usecase = new GetContactRequestsUseCase(repository);
    })

    it("should return null", async () => {
        const res = await usecase.execute("user5");

        expect(res).toBeNull();
    })

    it("should return an array of contact requests", async () => {
        const res = await usecase.execute("user2");

        if (res) {
            expect(res).toBeDefined();
            expect(res).toEqual([cr]);
            expect(res[0] instanceof ContactRequest).toBeTruthy();
        }
    })
})