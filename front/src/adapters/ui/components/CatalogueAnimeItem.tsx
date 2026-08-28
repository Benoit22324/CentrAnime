import { Link } from "react-router-dom"
import type Anime from "../../../domain/entities/Anime"

type CatalogueAnimeItemProps = {
    anime: Anime
}

export const CatalogueAnimeItem = ({ anime }: CatalogueAnimeItemProps) => {
    const mainTitle = anime.getMainTitle().length > 19 ? anime.getMainTitle().slice(0, 17) + "..." : anime.getMainTitle()

    return <>
        <Link to={`/anime/${anime.getId()}`} className="flex flex-col items-center gap-2 w-[205px] py-2 bg-light-grey rounded-xl shadow-custom-1 shadow-black/20 hover:scale-95">
            <img src={anime.getPosterUrl()} alt={anime.getMainTitle() + " poster"} className="h-[220px] rounded-lg" />

            <div className="w-full">
                <p className="text-lg text-center font-semibold">{mainTitle}</p>
                <div className="flex justify-between w-[70%] mx-auto">
                    <span className="text-light-darkgrey">ep{anime.getEpisodes() > 1 ? "s" : ""} {anime.getEpisodes()}</span>
                    <span className="text-light-darkgrey">{anime.getType() === "MOVIE" ? "FILM" : anime.getType()}</span>
                </div>
            </div>
        </Link>
    </>
}