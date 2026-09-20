import { useState } from "react"
import type Chat from "../../../domain/entities/Chat"
import { FaRegPaperPlane } from "react-icons/fa"
import { ChatContactMessage } from "./ChatContactMessage"
import type ChatMessage from "../../../domain/entities/ChatMessage"

type ChatContactProps = {
    data: Chat,
    closeChat: () => void,
    inputMsg: string,
    editMsg: ChatMessage | null,
    setInputMsg: (value: string) => void,
    setEditMsg: (value: ChatMessage | null) => void,
    onSubmit: () => void,
    onDelete: (id: string) => void
}

export const ChatContact = ({ data, closeChat, inputMsg, editMsg, setInputMsg, setEditMsg, onSubmit, onDelete }: ChatContactProps) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const handleClose = () => {
        closeChat();
        setIsOpen(false);
    }

    return <>
        <div className="flex flex-col items-center flex-grow w-[320px] bg-dark-grey rounded-t-2xl">
            <div className="relative flex justify-center items-center w-full py-2 rounded-t-2xl hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <span className="font-semibold">{data.getContactUsername()}</span>
                <span className="absolute right-5 font-bold z-50" onClick={handleClose}>X</span>
            </div>

            {
                isOpen && <>
                    <div className="flex flex-col gap-2 w-full h-[250px] px-2 py-3 bg-light-lightgrey border-dark-grey border-x-2 overflow-y-auto scrollbar-none">
                        {
                            (data.getMessages() && data.getMessages().length > 0) ? data.getMessages().map(m => <ChatContactMessage
                                key={m.getId()}
                                message={m}
                                isEdited={editMsg?.getId() === m.getId()}
                                setEdit={setEditMsg}
                                onDelete={() => onDelete(m.getId())}
                            />)
                            : <span className="px-2 py-1.5 font-semibold text-sm text-center">Aucun message trouvé</span>
                        }
                    </div>
                    <div className="flex gap-2 justify-center items-center gap-2 w-full h-[50px] px-2 py-3 bg-light-lightgrey border-dark-grey border-x-2">
                        <input
                            value={inputMsg}
                            className="w-[80%] px-2 py-1 bg-light-lightgrey text-base rounded-lg border border-dark shadow-custom-1 shadow-black/20 dark:bg-dark-grey dark:border-light"
                            onChange={(e) => setInputMsg(e.target.value)}
                        />
                        <button
                            className={`w-fit font-semibold p-1 bg-light-grey border border-dark hover:bg-light-lightgrey rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95`}
                            onClick={onSubmit}
                        >
                            <FaRegPaperPlane size={20} />
                        </button>
                    </div>
                </>
            }
        </div>
    </>
}