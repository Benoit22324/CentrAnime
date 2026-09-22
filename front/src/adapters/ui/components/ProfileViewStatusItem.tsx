import { Link } from "react-router-dom";
import type Opinion from "../../../domain/entities/Opinion"
import type Anime from "../../../domain/entities/Anime";

type ProfileViewStatusItemProps = {
    opinion: Opinion
}

export const ProfileViewStatusItem = ({ opinion }: ProfileViewStatusItemProps) => {
    const anime = opinion.getAnime() as Anime;
    const title = anime.getMainTitle().length > 35 ? anime.getMainTitle().slice(0, 32) + "..." : anime.getMainTitle();

    return <>
        <Link to={`/anime/${anime?.getId()}`} className="flex flex-col gap-2 px-4 py-2 bg-light-grey rounded-xl shadow-custom-1 shadow-dark/20 hover:scale-95 dark:bg-dark-grey dark:shadow-light-grey/20">
            <div className="flex flex-col lg:flex-row justify-between lg:gap-2">
                <h3 className="w-full lg:w-2/3 font-semibold text-sm lg:text-base dark:text-light">{title}</h3>
                <span className="w-full lg:w-1/3 lg:text-end text-sm lg:text-base dark:text-light">Episode{anime.getEpisodes() > 1 ? "s" : ""} : {anime.getEpisodes()}</span>
            </div>

            <p className="text-sm lg:text-base dark:text-light">Statut de visionnage : {opinion.getViewStatus()}</p>
        </Link>
    </>
}