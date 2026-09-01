import { useState } from "react";
import { Button } from "./Button"
import type Opinion from "../../../domain/entities/Opinion";

type AnimeOpinionProps = {
    opinion: Opinion | null,
    handleOpinionChange: (viewStatus: string | null, note: number | null, comment: string | null) => void
}

export const AnimeOpinion = ({ opinion, handleOpinionChange }: AnimeOpinionProps) => {
    const [ isNoteOpen, setIsNoteOpen ] = useState<boolean>(false);
    const [ isCommentOpen, setIsCommentOpen ] = useState<boolean>(false);

    const [ viewStatus, setViewStatus ] = useState<string>((opinion && opinion.getViewStatus()) ? opinion.getViewStatus() : "");
    const [ note, setNote ] = useState<string>((opinion && opinion.getNote()) ? String(opinion.getNote()) : String(0));
    const [ comment, setComment ] = useState<string>((opinion && opinion.getComment()) ? opinion.getComment() : "");

    const handleViewStatusChange = (value: string) => {
        setViewStatus(value);
    }

    const handleNoteChange = (value: string) => {
        if (!value.match(/^(\d{0,2}(\.\d?)?)?$/gi)) return

        setNote(Number(value) <= 10 ? value : String(10));
    }

    const handleCommentChange = (value: string) => {
        setComment(value);
    }

    return <>
        <div className="flex flex-col gap-1 p-3 bg-light-grey rounded-lg shadow-custom-1 shadow-black/20">
            <h2 className="mb-1 text-xl md:text-2xl font-semibold">Votre avis</h2>

            <div className="flex items-center gap-2">
                <label htmlFor="view_status">Status de visionnage :</label>
                <select id="view_status" value={viewStatus} onChange={(e) => handleViewStatusChange(e.target.value)} className="px-2 py-1 bg-light-lightgrey text-sm text-light-darkgrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 dark:bg-dark-grey dark:border-light">
                    <option value={""} hidden>Sélectionner le statut</option>
                    <option value={"En cours"}>En cours</option>
                    <option value={"Pause"}>Pause</option>
                    <option value={"Fini"}>Fini</option>
                    <option value={"Abandonnée"}>Abandonnée</option>
                </select>
                <Button
                    label={(opinion && opinion.getViewStatus().trim()) ? "Modifier" : "Ajouter"}
                    className="px-2 py-1 font-semibold bg-light-blue hover:bg-light-lightblue"
                    handleClick={() => handleOpinionChange(viewStatus, null, null)}
                />
            </div>

            <div className="flex items-center gap-2">
                <p>Votre note :</p>
                {
                    isNoteOpen ? <>
                        <input
                            value={note}
                            onChange={(e) => handleNoteChange(e.target.value)}
                            className="w-[70px] px-2 py-1 bg-light-lightgrey text-sm rounded-lg border border-dark shadow-custom-1 shadow-black/20 dark:bg-dark-grey dark:border-light"
                            placeholder="Ex : 8.0"
                        />
                        <Button
                            label="Enregistrer"
                            className="px-2 py-1 font-semibold bg-light-green hover:bg-light-lightgreen"
                            handleClick={() => {
                                handleOpinionChange(null, Number(note), null);
                                setIsNoteOpen(false);
                            }}
                        />
                    </>
                    : 
                    <>
                        {
                            (opinion && opinion.getNote() > 0) && <span>{opinion.getNote()}</span>
                        }
                        <Button
                            label={(opinion && opinion.getNote()) ? "Modifier" : "Noter"}
                            className="px-2 py-1 font-semibold bg-light-yellow hover:bg-light-lightyellow"
                            handleClick={() => setIsNoteOpen(true)}
                        />
                    </>
                }
            </div>

            <div className="flex flex-col">
                <div className="flex items-center gap-3">
                    <p>Votre commentaire :</p>
                    {
                        !isCommentOpen && <Button
                            label={(opinion && opinion.getComment()) ? "Modifier" : "Ajouter"}
                            className="px-2 py-1 font-semibold bg-light-blue hover:bg-light-lightblue"
                            handleClick={() => setIsCommentOpen(true)}
                        />
                    }
                </div>
                {
                    isCommentOpen ? <>
                        <textarea
                            value={comment}
                            onChange={(e) => handleCommentChange(e.target.value)}
                            rows={3}
                            className="px-2 py-1 bg-light-lightgrey text-sm rounded-lg border border-dark shadow-custom-1 shadow-black/20 dark:bg-dark-grey dark:border-light"
                        />
                        <Button
                            label="Enregistrer"
                            className="mt-2 px-2 py-1 font-semibold bg-light-green hover:bg-light-lightgreen"
                            handleClick={() => {
                                handleOpinionChange(null, null, comment);
                                setIsCommentOpen(false);
                            }}
                        />
                        <Button
                            label="Annuler"
                            className="mt-2 px-2 py-1 font-semibold border border-dark bg-light-grey hover:bg-light-lightgrey dark:border-light"
                            handleClick={() => {
                                handleOpinionChange(null, null, comment);
                                setIsCommentOpen(false);
                            }}
                        />
                    </>
                    : (opinion && opinion.getComment()) ? <p className="text-sm">{opinion.getComment()}</p>
                    : <p className="text-light-darkgrey">Aucun commentaire trouvé</p>
                }
            </div>
        </div>
    </>
}