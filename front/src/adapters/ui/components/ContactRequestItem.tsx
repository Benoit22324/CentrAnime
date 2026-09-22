import type ContactRequest from "../../../domain/entities/ContactRequest"
import { convertDateToText } from "../../../utils/convertDateToText"
import { Button } from "./Button"

type ContactRequestItemProps = {
    contactRequest: ContactRequest,
    handleRequest: (type: "Accept" | "Deny") => void
}

export const ContactRequestItem = ({ contactRequest, handleRequest }: ContactRequestItemProps) => {
    return <>
        <div className="flex flex-col gap-2 w-full px-4 py-2 bg-light-lightgrey rounded-xl shadow-custom-1 shadow-dark/20 dark:bg-dark-grey dark:shadow-light-grey/20">
            <div className="flex justify-between items-center gap-2">
                <span className="text-base md:text-lg font-semibold dark:text-light">{contactRequest.getSenderName()}</span>
                <span className="text-xs md:text-sm dark:text-light">Envoyé le {convertDateToText(new Date(contactRequest.getCreatedAt()))}</span>
            </div>

            <div className="flex justify-between items-center">
                <Button
                    label="Accepter"
                    className="p-2 font-semibold bg-light-green hover:bg-light-lightgreen dark:bg-dark-green dark:hover:bg-dark-lightgreen dark:text-light"
                    handleClick={() => handleRequest("Accept")}
                />
                <Button
                    label="Refuser"
                    className="p-2 font-semibold bg-light-red hover:bg-light-lightred dark:bg-dark-red dark:hover:bg-dark-lightred dark:text-light"
                    handleClick={() => handleRequest("Deny")}
                />
            </div>
        </div>
    </>
}