import { NextFunction, Request, Response } from "express";
import AddMessageUseCase from "../../application/usecases/AddMessageUseCase";
import DeleteMessageUseCase from "../../application/usecases/DeleteMessageUseCase";
import GetChatUseCase from "../../application/usecases/GetChatUseCase";
import UpdateMessageUseCase from "../../application/usecases/UpdateMessageUseCase";
import { AddMessageInputs } from "../dto";

class ChatController {
    constructor(
        private readonly getChatUseCase: GetChatUseCase,
        private readonly addMessageUseCase: AddMessageUseCase,
        private readonly updateMessageUseCase: UpdateMessageUseCase,
        private readonly deleteMessageUseCase: DeleteMessageUseCase
    ) { }

    async getChat(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const chatId = req.query.chatId as string || "";
            const contactId = req.query.contactId as string || "";

            const chat = await this.getChatUseCase.execute(chatId, contactId, id);

            return res.jsonSuccess(chat);
        } catch (error) {
            next(error);
        }
    }

    async addMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { chatId } = req.params;
            const { message } = req.body as AddMessageInputs;

            if (!chatId || typeof(chatId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const chatMessage = await this.addMessageUseCase.execute(id, chatId, message);

            return res.jsonSuccess(chatMessage, 201);
        } catch (error) {
            next(error);
        }
    }

    async updateMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { messageId } = req.params;
            const { message } = req.body as AddMessageInputs;

            if (!messageId || typeof(messageId) !== "string") return res.jsonError("Paramètre invalide", 404);

            const chatMessage = await this.updateMessageUseCase.execute(id, messageId, message);

            return res.jsonSuccess(chatMessage, 201);
        } catch (error) {
            next(error);
        }
    }

    async deleteMessage(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            if (!req.user) return res.jsonError("Accès non autorisé", 403);

            const { id } = req.user;
            const { messageId } = req.params;

            if (!messageId || typeof(messageId) !== "string") return res.jsonError("Paramètre invalide", 404);

            await this.deleteMessageUseCase.execute(id, messageId);

            return res.jsonSuccess(null, 201);
        } catch (error) {
            next(error);
        }
    }
}

export default ChatController;