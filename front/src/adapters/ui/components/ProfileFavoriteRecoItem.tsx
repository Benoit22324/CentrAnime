import { useState } from "react";
import type Recommandation from "../../../domain/entities/Recommandation"
import { RecommandationDetailModal } from "./RecommandationDetailModal";

type ProfileFavoriteItemProps = {
    reco: Recommandation
}

export const ProfileFavoriteRecoItem = ({ reco }: ProfileFavoriteItemProps) => {
    const title = reco.getTitle().length > 35 ? reco.getTitle().slice(0, 32) + "..." : reco.getTitle();
    const description = reco.getDescription().length > 45 ? reco.getDescription().slice(0, 42) + "..." : reco.getDescription();

    const [ isDetailOpen, setIsDetailOpen ] = useState<boolean>(false);

    return <>
        {
            isDetailOpen && <RecommandationDetailModal
                reco={reco}
                handleFavorite={() => {}}
                handleLike={() => {}}
                deleteList={() => {}}
                onClose={() => setIsDetailOpen(false)}
                noExtra
            />
        }
        <div
            className="flex flex-col gap-2 px-4 py-2 bg-light-grey rounded-xl shadow-custom-1 shadow-dark/20 hover:scale-95 hover:cursor-pointer dark:bg-dark-grey dark:shadow-light-grey/20"
            onClick={() => setIsDetailOpen(true)}
        >
            <h3 className="w-2/3 font-semibold text-sm lg:text-base dark:text-light">{title}</h3>

            <p className="text-sm lg:text-base dark:text-light">{description}</p>
            <p className="text-base lg:text-lg font-semibold dark:text-light">{reco.getAuthor()}</p>
        </div>
    </>
}