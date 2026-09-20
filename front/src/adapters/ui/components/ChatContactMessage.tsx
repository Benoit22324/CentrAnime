import { FaPen, FaRegTrashAlt } from "react-icons/fa"
import { RxCross2 } from "react-icons/rx"
import type ChatMessage from "../../../domain/entities/ChatMessage"

type ChatContactMessageProps = {
    message: ChatMessage,
    isEdited: boolean,
    setEdit: (value: ChatMessage | null) => void,
    onDelete: () => void
}

export const ChatContactMessage = ({ message, isEdited, setEdit, onDelete }: ChatContactMessageProps) => {

    return <>
        <div className={`flex justify-between w-[80%] px-2 py-1.5 ${ message.getIsOwner() ? "self-end bg-light-blue" : "self-start bg-light-grey" } rounded-lg shadow-custom-1 shadow-black/20`}>
            <span className={`w-[80%] font-semibold`}>{message.getMessage()}</span>
            {
                message.getIsOwner() && <div className={`flex justify-end gap-1 w-[20%] ${!isEdited ? "py-1.5" : "py-1"}`}>
                    {
                        !isEdited ? <>
                            <FaPen
                                className="text-dark hover:cursor-pointer hover:scale-90 dark:text-light"
                                size={14}
                                onClick={() => setEdit(message)}
                            />
                            <FaRegTrashAlt
                                className="text-light-red hover:cursor-pointer hover:scale-90 dark:text-light-lightred"
                                size={14}
                                onClick={onDelete}
                            />
                        </>
                        : <RxCross2
                            className="text-light-red hover:cursor-pointer hover:scale-90 dark:text-light-lightred"
                            size={16}
                            onClick={() => setEdit(null)}
                        />
                    }
                </div>
            }
        </div>
    </>
}