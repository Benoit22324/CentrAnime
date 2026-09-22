import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { FaRegThumbsUp, FaThumbsUp, FaRegStar, FaStar } from "react-icons/fa6";
import type Recommandation from "../../../domain/entities/Recommandation";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import { useState } from "react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

type RecommandationDetailModalProps = {
    reco: Recommandation,
    handleFavorite: () => void,
    handleLike: () => void,
    deleteList: () => void,
    onClose: () => void,
    noExtra?: boolean
}

export const RecommandationDetailModal = ({ reco, handleFavorite, handleLike, deleteList, onClose, noExtra }: RecommandationDetailModalProps) => {
    const [ isDeleteConfirmation, setIsDeleteConfirmation ] = useState<boolean>(false);

    return <>
        {
            isDeleteConfirmation && <DeleteConfirmationModal
                onConfirm={() => deleteList()}
                onCancel={() => setIsDeleteConfirmation(false)}
            />
        }
        <div className="fixed top-0 left-0 flex items-center justify-center w-full h-[100dvh] bg-black/30 z-20">
            <div className="flex flex-col gap-2 w-[95%] md:w-[600px] py-4 px-6 md:px-8 bg-light-grey rounded-xl dark:bg-dark-grey">
                <div className="flex flex-col-reverse md:flex-row justify-between gap-1 md:gap-4 w-full">
                    <h2 className="text-lg md:text-xl font-semibold dark:text-light">{reco.getTitle()}</h2>

                    <div className={`flex${noExtra ? " justify-end" : ""} items-start gap-2 w-full md:w-1/5`}>
                        {
                            !noExtra && <>
                                <div className="flex gap-2 w-full md:w-fit">
                                    <div className="flex items-center gap-1">
                                        {
                                            reco.getUserInteraction().likeId ? <FaThumbsUp size={22} className="text-light-blue hover:cursor-pointer dark:text-dark-blue" onClick={handleLike} />
                                            : <FaRegThumbsUp size={22} className="text-light-blue hover:cursor-pointer dark:text-dark-blue" onClick={handleLike} />
                                        }
                                        <span className="text-sm md:text-base dark:text-light">{reco.getLikes()}</span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                        {
                                            reco.getUserInteraction().favoriteId ? <FaStar size={22} className="text-light-yellow hover:cursor-pointer dark:text-dark-yellow" onClick={handleFavorite} />
                                            : <FaRegStar size={22} className="text-light-yellow hover:cursor-pointer dark:text-dark-yellow" onClick={handleFavorite} />
                                        }
                                        <span className="text-sm md:text-base dark:text-light">{reco.getFavorites()}</span>
                                    </div>
                                </div>
                            </>
                        }
                        <Button
                            label="X"
                            handleClick={onClose}
                            className="ml-2 px-2 font-semibold bg-light-grey border border-dark hover:bg-light-lightgrey dark:bg-dark-grey dark:hover:bg-dark-darkgrey dark:border-light dark:text-light"
                        />
                    </div>
                </div>

                <p className="text-sm md:text-base dark:text-light">{reco.getDescription()}</p>

                <div className="flex flex-col">
                    <p className="text-sm md:text-base dark:text-light">Anime{reco.getAnimes().length > 1 ? "s" : ""} sélectionné{reco.getAnimes().length > 1 ? "s" : ""} :{reco.getAnimes().length === 0 && <span className="text-xs md:text-sm font-semibold"> Aucun anime est sélectionné.</span>}</p>
                    {
                        reco.getAnimes().length > 0 && <ul className="list-disc max-h-[40dvh] pl-6 overflow-y-auto dark:text-light">
                            {
                                reco.getAnimes().map(a => <li key={a.id}>
                                    <Link to={`/anime/${a.animeId}`} className="text-sm md:text-base text-dark font-semibold hover:text-light-darkergrey dark:text-light dark:hover:text-dark-lightgrey">{a.title}</Link>
                                </li>)
                            }
                        </ul>
                    }
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-base md:text-lg font-semibold dark:text-light">{reco.getAuthor()}</p>
                    {
                        (reco.getIsOwner() && !noExtra) && <>
                            <Link to={`/edit-list/${reco.getId()}`} className="hover:scale-90">
                                <FaPen size={14} className="text-dark dark:text-light" />
                            </Link>
                            <FaRegTrashAlt size={16} className="text-light-red hover:cursor-pointer hover:scale-90 dark:text-dark-red" onClick={() => setIsDeleteConfirmation(true)} />
                        </>
                    }
                </div>
            </div>
        </div>
    </>
}