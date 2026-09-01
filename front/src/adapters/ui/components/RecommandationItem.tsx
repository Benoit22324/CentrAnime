import { useState } from "react";
import type Recommandation from "../../../domain/entities/Recommandation"
import { RecommandationDetailModal } from "./RecommandationDetailModal";

type RecommandationItemProps = {
    reco: Recommandation,
    handleFavorite: (type: string, id: string) => void
    handleLike: (type: string, id: string) => void
    deleteList: (id: string) => void
}

export const RecommandationItem = ({ reco, handleFavorite, handleLike, deleteList }: RecommandationItemProps) => {
    const title = reco.getTitle().length > 36 ? reco.getTitle().slice(0, 33) + "..." : reco.getTitle();
    const description = reco.getDescription().length > 50 ? reco.getDescription().slice(0, 47) + "..." : reco.getDescription();
    const animes = reco.getAnimes().map(a => a.title).join(", ").length > 80 ? reco.getAnimes().map(a => a.title).join(", ").slice(0, 76) + "..." : reco.getAnimes().map(a => a.title).join(", ");

    const [ isDetailOpen, setIsDetailOpen ] = useState<boolean>(false);

    return <>
        {
            isDetailOpen && <RecommandationDetailModal
                reco={reco}
                handleFavorite={() => reco.getUserInteraction().favoriteId ? handleFavorite("Remove", reco.getUserInteraction().favoriteId) : handleFavorite("Add", reco.getId())}
                handleLike={() => reco.getUserInteraction().likeId ? handleLike("Remove", reco.getUserInteraction().likeId) : handleLike("Add", reco.getId())}
                deleteList={() => deleteList(reco.getId())}
                onClose={() => setIsDetailOpen(false)}
            />
        }
        <div className="flex flex-col justify-between gap-2 w-[30%] py-2 px-3 bg-light-grey rounded-xl shadow-custom-1 shadow-black/20 hover:scale-98 hover:cursor-pointer" onClick={() => setIsDetailOpen(true)}>
            <h2 className="text-base md:text-lg font-semibold">{title}</h2>

            <p className="text-xs md:text-sm">{description}</p>
            <p className="text-xs md:text-sm">Anime{reco.getAnimes().length > 1 ? "s" : ""} sélectionné{reco.getAnimes().length > 1 ? "s" : ""}: {animes}</p>

            <p className="text-sm md:text-base font-semibold">{reco.getAuthor()}</p>
        </div>
    </>
}