import { Contact as PrismaContact } from "@prisma/client";
import { sanitizeContact } from "../../api/utility";
import CreateContactUseCase from "../../application/usecases/CreateContactUseCase";
import Contact from "../../domain/entities/Contact";
import InMemoryChatRepository from "../../infrastructure/repositories/InMemoryChatRepository";
import InMemoryContactRepository from "../../infrastructure/repositories/InMemoryContactRepository";
import InMemoryContactRequestRepository from "../../infrastructure/repositories/InMemoryContactRequestRepository";

const newContact = sanitizeContact({
    id: "contact1",
    userAId: "user1",
    userBId: "user4",
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

describe("CreateContactUseCase", () => {
    let contactRepository: InMemoryContactRepository;
    let contactRequestRepository: InMemoryContactRequestRepository;
    let chatRepository: InMemoryChatRepository;
    let usecase: CreateContactUseCase;

    beforeEach(() => {
        contactRepository = new InMemoryContactRepository();
        contactRequestRepository = new InMemoryContactRequestRepository();
        chatRepository = new InMemoryChatRepository();
        usecase = new CreateContactUseCase(contactRequestRepository, contactRepository, chatRepository);
    })

    // it("should throw an error 'Vous êtes déjà en contact'", async () => {
    //     await expect(usecase.execute("cr1", "user2")).rejects.toThrow("Vous êtes déjà en contact");
    // })

    it("should throw an error 'Requête introuvable' with incorrect userId", async () => {
        await expect(usecase.execute("cr1", "user3")).rejects.toThrow("Requête introuvable");
    })

    it("should throw an error 'Requête introuvable' with incorrect id", async () => {
        await expect(usecase.execute("cr13", "user4")).rejects.toThrow("Requête introuvable");
    })

    it("should return new contact", async () => {
        const res = await usecase.execute("cr1", "user4");

        expect(res).toBeDefined();
        expect(res).toBeInstanceOf(Contact);
        expect(res).toEqual(newContact)
    })
})