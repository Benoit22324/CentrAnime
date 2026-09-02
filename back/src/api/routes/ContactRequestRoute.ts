import { Router } from "express";
import { authenticationMiddleware } from "../middlewares";
import ContactRequestRepository from "../../infrastructure/repositories/ContactRequestRepository";
import GetContactRequestsUseCase from "../../application/usecases/GetContactRequestsUseCase";
import ContactRequestController from "../controllers/ContactRequestController";
import CreateContactRequestUseCase from "../../application/usecases/CreateContactRequestUseCase";
import UserRepository from "../../infrastructure/repositories/UserRepository";
import ContactRepository from "../../infrastructure/repositories/ContactRepository";
import DeleteContactRequestUseCase from "../../application/usecases/DeleteContactRequestUseCase";

const userRepository = new UserRepository();
const contactRepository = new ContactRepository();

const contactRequestRepository = new ContactRequestRepository();
const getContactRequestsUseCase = new GetContactRequestsUseCase(contactRequestRepository);
const createContactRequestUseCase = new CreateContactRequestUseCase(
    userRepository,
    contactRepository,
    contactRequestRepository
);
const deleteContactRequestUseCase = new DeleteContactRequestUseCase(contactRequestRepository);

const contactRequestController = new ContactRequestController(
    getContactRequestsUseCase,
    createContactRequestUseCase,
    deleteContactRequestUseCase
)

const router = Router();

router.use(authenticationMiddleware);

router.get("/", contactRequestController.getContactRequests.bind(contactRequestController));
router.post("/", contactRequestController.createContactRequest.bind(contactRequestController));
router.delete("/:requestId", contactRequestController.deleteContactRequest.bind(contactRequestController));

export { router as ContactRequestRoute };