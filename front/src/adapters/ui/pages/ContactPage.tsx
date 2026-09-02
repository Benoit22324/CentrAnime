import { useEffect, useState } from "react";
import GetContactRequestsUseCase from "../../../domain/usecases/GetContactRequestsUseCase";
import GetContactsUseCase from "../../../domain/usecases/GetContactsUseCase";
import ContactRepository from "../../data/api/ContactRepository"
import ContactRequestRepository from "../../data/api/ContactRequestRepository";
import Contact from "../../../domain/entities/Contact";
import type ContactRequest from "../../../domain/entities/ContactRequest";
import { ContactItem } from "../components/ContactItem";
import { ContactRequestItem } from "../components/ContactRequestItem";
import CreateContactRequestUseCase from "../../../domain/usecases/CreateContactRequestUseCase";
import { Button } from "../components/Button";
import CreateContactUseCase from "../../../domain/usecases/CreateContactUseCase";
import DeleteContactRequestUseCase from "../../../domain/usecases/DeleteContactRequestUseCase";
import DeleteContactUseCase from "../../../domain/usecases/DeleteContactUseCase";

export const ContactPage = () => {
    const contactRepository = new ContactRepository();
    const getContactsUseCase = new GetContactsUseCase(contactRepository);
    const createContactUseCase = new CreateContactUseCase(contactRepository);
    const deleteContactUseCase = new DeleteContactUseCase(contactRepository);

    const contactRequestRepository = new ContactRequestRepository();
    const getContactRequestsUseCase = new GetContactRequestsUseCase(contactRequestRepository);
    const createContactRequestUseCase = new CreateContactRequestUseCase(contactRequestRepository);
    const deleteContactRequestUseCase = new DeleteContactRequestUseCase(contactRequestRepository);

    const [ contactEmail, setContactEmail ] = useState<string>("");
    const [ contactDatas, setContactDatas ] = useState<Contact[] | null>(null);
    const [ contactRequestDatas, setContactRequestDatas ] = useState<ContactRequest[] | null>(null);
    const [ error, setError ] = useState<string>("");
    const [ success, setSuccess ] = useState<boolean>(false);

    const handleDeleteContact = async (id: string) => {
        if (!contactDatas) return

        try {
            await deleteContactUseCase.execute({ contactId: id });

            const updatedList = contactDatas.filter(c => c.getId() !== id);
            setContactDatas(updatedList);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const handleRequest = async (type: "Accept" | "Deny", id: string) => {
        if (!contactRequestDatas) return

        try {
            if (type === "Accept") {
                const newContact = await createContactUseCase.execute({ requestId: id });

                if (!newContact) throw new Error("Une erreur s'est produite");

                const updatedContactList = contactDatas ? [...contactDatas, newContact] : [newContact];
                const updatedRequestList = contactRequestDatas.filter(req => req.getId() !== id);

                setContactDatas(updatedContactList);
                setContactRequestDatas(updatedRequestList);
            } else if (type === "Deny") {
                await deleteContactRequestUseCase.execute({ requestId: id });

                const updatedRequestList = contactRequestDatas.filter(req => req.getId() !== id);
                setContactRequestDatas(updatedRequestList);
            }
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const sendRequest = async () => {
        if (!contactEmail) return

        setError("");

        try {
            const response = await createContactRequestUseCase.execute({ email: contactEmail });

            if (response) setError(response);
            else {
                setContactEmail("");
                setSuccess(true);

                setTimeout(() => setSuccess(false), 3000);
            };
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchContacts = async () => {
        try {
            const contacts = await getContactsUseCase.execute();

            setContactDatas(contacts);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchContactRequests = async () => {
        try {
            const contactRequests = await getContactRequestsUseCase.execute();

            setContactRequestDatas(contactRequests);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    useEffect(() => {
        fetchContacts();
        fetchContactRequests();
    }, [])

    return <>
        <div className="flex justify-between items-center gap-2 h-[80dvh]">
            <div className="flex flex-col items-center gap-4 w-[40%] h-[90%]">
                <h2 className="text-2xl md:text-3xl font-semibold text-center">Vos contacts</h2>

                <div className="flex flex-col items-center gap-2 w-3/4 h-[90%] p-2 bg-light-lightgrey rounded-xl shadow-custom-1 shadow-dark/20">
                    {
                        contactDatas ? contactDatas.map(contact => <ContactItem
                            key={contact.getId()}
                            contact={contact}
                            handleDelete={() => handleDeleteContact(contact.getId())}
                        />)
                        : <span className="text-lg md:text-xl font-semibold">Aucun contact</span>
                    }
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-[40%] h-[90%]">
                <h2 className="text-2xl md:text-3xl font-semibold text-center">Demandes de contacts</h2>

                <div className="flex justify-between items-center gap-4 w-2/3">
                    <input
                        value={contactEmail}
                        onChange={(e) => {
                            setContactEmail(e.target.value);
                            setError("");
                        }}
                        className="w-full px-3 py-2 bg-light-lightgrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 dark:bg-dark-grey dark:border-light"
                        placeholder=""
                    />
                    <Button
                        label="Envoyer"
                        handleClick={sendRequest}
                    />
                </div>

                {
                    error && <span className="text-xs md:text-sm font-semibold text-light-red">{error}</span>
                }
                {
                    success && <span className="text-xs md:text-sm font-semibold text-light-green">Requête envoyé avec succès</span>
                }

                <div className="flex flex-col items-center gap-2 w-3/4 h-[70%] p-2">
                    {
                        contactRequestDatas ? contactRequestDatas.map(cr => <ContactRequestItem
                            key={cr.getId()}
                            contactRequest={cr}
                            handleRequest={(type: "Accept" | "Deny") => handleRequest(type, cr.getId())}
                        />)
                        : <span className="text-lg md:text-xl font-semibold">Aucune requête</span>
                    }
                </div>
            </div>
        </div>
    </>
}