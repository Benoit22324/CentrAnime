import { SlBubble } from "react-icons/sl";
import { useState } from "react"
import type Contact from "../../../domain/entities/Contact"

type ChatMessagingProps = {
    contactList: Contact[] | null,
    fetchChat: (id: string, chatId: string) => void
}

export const ChatMessaging = ({ contactList, fetchChat }: ChatMessagingProps) => {
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    return <>
        <button
            className="lg:hidden absolute top-5 right-5 h-fit p-1 md:p-2 font-semibold bg-light-grey border border-dark hover:bg-light-lightgrey rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95 dark:bg-dark-grey dark:hover:bg-dark-darkgrey dark:border-light dark:shadow-light-grey/20"
            onClick={() => setIsOpen(true)}
        >
            <SlBubble size={24} className="dark:text-light" />
        </button>

        <div className={`fixed bottom-0 right-0 lg:relative ${isOpen ? "flex" : "hidden lg:flex"} flex-col items-center w-full md:w-[60%] lg:w-[260px] xl:w-[320px] bg-light-darkgrey rounded-t-2xl dark:bg-dark-darkergrey`}>
            <span className="w-full py-2 text-center font-semibold rounded-t-2xl border-2 border-b-0 border-transparent hover:cursor-pointer dark:text-light dark:border-light" onClick={() => setIsOpen(!isOpen)}>Messagerie</span>

            {
                isOpen && <div className="flex flex-col gap-2 w-full h-[300px] px-2 py-3 bg-light-lightgrey border-light-darkgrey border-x-2 overflow-y-auto dark:bg-dark-darkgrey dark:border-light">
                    {
                        contactList ? contactList.map(c => <span
                            key={c.getId()}
                            className="px-2 py-1.5 bg-light-grey font-semibold rounded-lg shadow-custom-1 shadow-black/20 hover:scale-95 dark:bg-dark-grey dark:text-light dark:shadow-light-grey/20"
                            onClick={() => fetchChat(c.getId(), c.getChatId())}
                        >{c.getContactName()}</span>)
                        : <span className="px-2 py-1.5 font-semibold text-sm text-center">Aucun contact trouvé</span>
                    }
                </div>
            }
        </div>
    </>
}