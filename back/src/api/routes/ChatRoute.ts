import { Router } from "express";
import { authenticationMiddleware } from "../middlewares";
import ChatRepository from "../../infrastructure/repositories/ChatRepository";
import GetChatUseCase from "../../application/usecases/GetChatUseCase";
import AddMessageUseCase from "../../application/usecases/AddMessageUseCase";
import UpdateMessageUseCase from "../../application/usecases/UpdateMessageUseCase";
import DeleteMessageUseCase from "../../application/usecases/DeleteMessageUseCase";
import ChatController from "../controllers/ChatController";

const chatRepository = new ChatRepository();
const getChatUseCase = new GetChatUseCase(chatRepository);
const addMessageUseCase = new AddMessageUseCase(chatRepository);
const updateMessageUseCase = new UpdateMessageUseCase(chatRepository);
const deleteMessageUseCase = new DeleteMessageUseCase(chatRepository);

const chatController = new ChatController(
    getChatUseCase,
    addMessageUseCase,
    updateMessageUseCase,
    deleteMessageUseCase
)

const router = Router();

router.use(authenticationMiddleware);

router.get("/", chatController.getChat.bind(chatController));
router.post("/message/:chatId", chatController.addMessage.bind(chatController));
router.patch("/message/:messageId", chatController.updateMessage.bind(chatController));
router.delete("/message/:messageId", chatController.deleteMessage.bind(chatController));

export { router as ChatRoute };