import { useState } from "react"
import type Contact from "../../../domain/entities/Contact"
import { DeleteConfirmationModal } from "./DeleteConfirmationModal"
import { FaRegTrashAlt } from "react-icons/fa"

type ContactItemProps = {
    contact: Contact
    handleDelete: () => void
}

export const ContactItem = ({ contact, handleDelete }: ContactItemProps) => {
    const [ isDeleteConfirmation, setIsDeleteConfirmation ] = useState<boolean>(false);

    return <>
        {
            isDeleteConfirmation && <DeleteConfirmationModal
                onConfirm={() => {
                    handleDelete();
                    setIsDeleteConfirmation(false);
                }}
                onCancel={() => setIsDeleteConfirmation(false)}
            />
        }
        <div className="flex justify-between items-center w-full px-4 py-2 bg-light-grey rounded-xl shadow-custom-1 shadow-dark/20">
            <span className="text-base md:text-lg font-semibold">{contact.getContactName()}</span>
            <FaRegTrashAlt className="text-light-red hover:cursor-pointer hover:scale-90 dark:text-light-lightred" size={16} onClick={() => setIsDeleteConfirmation(true)} />
        </div>
    </>
}