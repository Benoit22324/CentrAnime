import { useEffect, useState } from "react"
import ChatRepository from "../../data/api/ChatRepository";
import GetChatUseCase from "../../../domain/usecases/GetChatUseCase";
import ContactRepository from "../../data/api/ContactRepository";
import GetContactsUseCase from "../../../domain/usecases/GetContactsUseCase";
import Contact from "../../../domain/entities/Contact";
import Chat from "../../../domain/entities/Chat";
import AddMessageUseCase from "../../../domain/usecases/AddMessageUseCase";
import { convertChatMessage } from "../../../utils/convertChatMessage";
import { ChatMessaging } from "./ChatMessaging";
import { ChatContact } from "./ChatContact";
import DeleteMessageUseCase from "../../../domain/usecases/DeleteMessageUseCase";
import UpdateMessageUseCase from "../../../domain/usecases/UpdateMessageUseCase";
import ChatMessage from "../../../domain/entities/ChatMessage";

export const ChatOverlay = () => {
    const contactRepository = new ContactRepository();
    const getContactsUseCase = new GetContactsUseCase(contactRepository);

    const chatRepository = new ChatRepository();
    const getChatUseCase = new GetChatUseCase(chatRepository);
    const addMessageUseCase = new AddMessageUseCase(chatRepository);
    const updateMessageUseCase = new UpdateMessageUseCase(chatRepository);
    const deleteMessageUseCase = new DeleteMessageUseCase(chatRepository);

    const [ contactList, setContactList ] = useState<Contact[] | null>(null);
    const [ chatData, setChatData ] = useState<Chat | null>(null);

    const [ inputMessage, setInputMessage ] = useState<string>("");
    const [ editMessage, setEditMessage ] = useState<ChatMessage | null>(null);

    const handleMessageSubmit = async () => {
        if (!inputMessage || inputMessage.trim() === "") return

        try {
            if (chatData) {
                if (editMessage) {
                    const newMessage = await updateMessageUseCase.execute({ messageId: editMessage.getId(), message: inputMessage });

                    const updatedChatMessages = chatData.getMessages().map(m => m.getId() === editMessage.getId() ? newMessage : m);
                    const updatedChatData = new Chat(
                        chatData.getId(),
                        updatedChatMessages,
                        chatData.getContactUsername()
                    );

                    setChatData(updatedChatData);
                    setEditMessage(null);
                } else {
                    const newMessage = await addMessageUseCase.execute({ chatId: chatData.getId(), message: inputMessage });

                    const updatedChatMessages = [...chatData.getMessages(), convertChatMessage(newMessage)];
                    const updatedChatData = new Chat(
                        chatData.getId(),
                        updatedChatMessages,
                        chatData.getContactUsername()
                    );

                    setChatData(updatedChatData);
                }

                setInputMessage("");
            }
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const handleDeleteMessage = async (id: string) => {
        try {
            if (chatData) {
                await deleteMessageUseCase.execute({ messageId: id });

                const updatedMessages = chatData.getMessages().filter(m => m.getId() !== id);

                const updatedChatData = new Chat(
                    chatData.getId(),
                    updatedMessages,
                    chatData.getContactUsername()
                );

                setChatData(updatedChatData);
            }
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchChat = async (id: string, chatId: string) => {
        try {
            const response = await getChatUseCase.execute({ contactId: id, chatId });

            setChatData(response);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchContacts = async () => {
        try {
            const response = await getContactsUseCase.execute();

            setContactList(response);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    useEffect(() => {
        fetchContacts();
    }, [])

    useEffect(() => {
        if (editMessage) setInputMessage(editMessage.getMessage());
        else setInputMessage("");
    }, [editMessage])

    return <>
        <div className="lg:fixed lg:bottom-0 lg:right-10 flex flex-row-reverse justify-between items-end gap-8">
            <ChatMessaging
                contactList={contactList}
                fetchChat={fetchChat}
            />

            {
                chatData && <ChatContact
                    data={chatData}
                    closeChat={() => setChatData(null)}
                    inputMsg={inputMessage}
                    editMsg={editMessage}
                    setInputMsg={setInputMessage}
                    setEditMsg={setEditMessage}
                    onSubmit={handleMessageSubmit}
                    onDelete={handleDeleteMessage}
                />
            }
        </div>
    </>
}