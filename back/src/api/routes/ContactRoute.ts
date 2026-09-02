import { Router } from "express";
import { authenticationMiddleware } from "../middlewares";
import ContactRepository from "../../infrastructure/repositories/ContactRepository";
import GetContactsUseCase from "../../application/usecases/GetContactsUseCase";
import DeleteContactUseCase from "../../application/usecases/DeleteContactUseCase";
import ContactController from "../controllers/ContactController";
import CreateContactUseCase from "../../application/usecases/CreateContactUseCase";
import ContactRequestRepository from "../../infrastructure/repositories/ContactRequestRepository";

const contactRequestRepository = new ContactRequestRepository();

const contactRepository = new ContactRepository();
const getContactsUseCase = new GetContactsUseCase(contactRepository);
const createContactUseCase = new CreateContactUseCase(contactRequestRepository, contactRepository);
const deleteContactUseCase = new DeleteContactUseCase(contactRepository);

const contactController = new ContactController(
    getContactsUseCase,
    createContactUseCase,
    deleteContactUseCase
);

const router = Router();

router.use(authenticationMiddleware);

router.get("/", contactController.getContacts.bind(contactController));
router.post("/:requestId", contactController.createContact.bind(contactController));
router.delete("/:contactId", contactController.deleteContact.bind(contactController));

export { router as ContactRoute };