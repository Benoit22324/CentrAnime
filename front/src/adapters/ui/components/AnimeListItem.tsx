import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom"
import type AnimeList from "../../../domain/entities/AnimeList"
import { useState } from "react";
import { DeleteConfirmationModal } from "./DeleteConfirmationModal";

type AnimeListItemProps = {
    animeList: AnimeList,
    deleteList: (anilistId: string) => void
}

export const AnimeListItem = ({ animeList, deleteList }: AnimeListItemProps) => {
    const [ isDeleteConfirmation, setIsDeleteConfirmation ] = useState<boolean>(false);

    return <>
        {
            isDeleteConfirmation && <DeleteConfirmationModal
                onConfirm={() => deleteList(animeList.getId())}
                onCancel={() => setIsDeleteConfirmation(false)}
            />
        }
        <div className="w-full md:w-[30%] h-[180px] md:h-[640px] py-4 px-3 bg-light-lightyellow/50 rounded-xl dark:bg-dark-lightyellow/70 hover:scale-98">
            <div className="flex justify-end items-center gap-2">
                <Link to={`/edit-list/${animeList.getId()}`} className="scale-90 hover:scale-80 lg:scale-100 lg:hover:scale-90 ">
                    <FaPen size={18} className="text-dark dark:text-light" />
                </Link>
                <FaRegTrashAlt className="text-light-red hover:cursor-pointer dark:text-dark-red scale-90 hover:scale-80 lg:scale-100 lg:hover:scale-90" size={20} onClick={() => setIsDeleteConfirmation(true)} />
            </div>

            <h2 className="md:my-4 text-xl lg:text-2xl font-semibold text-center dark:text-light">{animeList.getTitle()}</h2>

            {
                animeList.getAnimes() && <ul className="h-[70%] md:h-[78%] lg:h-[85%] pl-8 list-disc overflow-y-auto scrollbar-none dark:text-light">
                    {
                        animeList.getAnimes().map(anime => <li key={anime.animeId}>
                            <Link to={`/anime/${anime.animeId}`}>
                                <span className="text-sm md:text-base hover:text-light-darkergrey dark:text-light dark:hover:text-light-grey">{anime.title}</span>
                            </Link>
                        </li>)
                    }
                </ul>
            }
        </div>
    </>
}