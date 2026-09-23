import { Link } from "react-router-dom"
import type Anime from "../../../domain/entities/Anime"

type CatalogueAnimeItemProps = {
    anime: Anime
}

export const CatalogueAnimeItem = ({ anime }: CatalogueAnimeItemProps) => {
    const mainTitle = anime.getMainTitle().length > 19 ? anime.getMainTitle().slice(0, 17) + "..." : anime.getMainTitle()

    return <>
        <Link to={`/anime/${anime.getId()}`} className="flex flex-col items-center gap-2 w-[160px] lg:w-[215px] py-2 px-2 lg:px-0 bg-light-grey rounded-xl shadow-custom-1 shadow-black/20 hover:scale-95 dark:bg-dark-grey dark:shadow-light-grey/20">
            <img src={anime.getPosterUrl()} alt={anime.getMainTitle() + " poster"} className="h-[180px] lg:h-[220px] rounded-lg" />

            <div className="w-full">
                <p className="text-base lg:text-lg text-center font-semibold dark:text-light">{mainTitle}</p>
                <div className="flex justify-between w-[70%] mx-auto">
                    <span className="text-sm lg:text-base text-light-darkergrey dark:text-dark-lightgrey">ep{anime.getEpisodes() > 1 ? "s" : ""} {anime.getEpisodes()}</span>
                    <span className="text-sm lg:text-base text-light-darkergrey dark:text-dark-lightgrey">{anime.getType() === "MOVIE" ? "FILM" : anime.getType()}</span>
                </div>
            </div>
        </Link>
    </>
}