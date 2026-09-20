import { useState } from "react"
import type Contact from "../../../domain/entities/Contact"

type ChatMessagingProps = {
    contactList: Contact[] | null,
    fetchChat: (id: string, chatId: string) => void
}

export const ChatMessaging = ({ contactList, fetchChat }: ChatMessagingProps) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return <>
        <div className="flex flex-col items-center flex-grow w-[320px] bg-dark-grey rounded-t-2xl">
            <span className="w-full py-2 text-center font-semibold rounded-t-2xl hover:cursor-pointer" onClick={() => setIsOpen(!isOpen)}>Messagerie</span>

            {
                isOpen && <div className="flex flex-col gap-2 w-full h-[300px] px-2 py-3 bg-light-lightgrey border-dark-grey border-x-2 overflow-y-auto">
                    {
                        contactList ? contactList.map(c => <span
                            key={c.getId()}
                            className="px-2 py-1.5 bg-light-grey font-semibold rounded-lg shadow-custom-1 shadow-black/20 hover:scale-95"
                            onClick={() => fetchChat(c.getId(), c.getChatId())}
                        >{c.getContactName()}</span>)
                        : <span className="px-2 py-1.5 font-semibold text-sm text-center">Aucun contact trouvé</span>
                    }
                </div>
            }
        </div>
    </>
}