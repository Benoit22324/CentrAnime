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
        <Link to={`/anime/${anime?.getId()}`} className="flex flex-col gap-2 px-4 py-2 bg-light-grey rounded-xl shadow-custom-1 shadow-dark/20 hover:scale-95">
            <div className="flex justify-between gap-2">
                <h3 className="w-2/3 font-semibold text-sm md:text-base">{title}</h3>
                <span className="w-1/3 text-end text-sm md:text-base">Episode{anime.getEpisodes() > 1 ? "s" : ""} : {anime.getEpisodes()}</span>
            </div>

            <p className="text-sm md:text-base">Statut de visionnage : {opinion.getViewStatus()}</p>
        </Link>
    </>
}