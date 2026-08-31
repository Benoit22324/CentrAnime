import { FaRegThumbsUp, FaThumbsUp, FaRegStar, FaStar } from "react-icons/fa6";
import type Recommandation from "../../../domain/entities/Recommandation"
import { Button } from "./Button";
import { Link } from "react-router-dom";

type RecommandationDetailModalProps = {
    reco: Recommandation,
    handleFavorite: () => void,
    handleLike: () => void,
    onClose: () => void
}

export const RecommandationDetailModal = ({ reco, handleFavorite, handleLike, onClose }: RecommandationDetailModalProps) => {
    return <>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-[100dvh] bg-black/30 z-30">
            <div className="flex flex-col gap-2 w-[95%] md:w-[600px] py-4 px-8 bg-light-grey rounded-xl">
                <div className="flex justify-between gap-4 w-full">
                    <h2 className="text-lg md:text-xl font-semibold">{reco.getTitle()}</h2>

                    <div className="flex items-center gap-2 w-1/5">
                        <div className="flex items-center gap-1">
                            {
                                reco.getUserInteraction().likeId ? <FaThumbsUp size={22} className="text-light-blue hover:cursor-pointer" onClick={handleLike} />
                                : <FaRegThumbsUp size={22} className="text-light-blue hover:cursor-pointer" onClick={handleLike} />
                            }
                            <span>{reco.getLikes()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            {
                                reco.getUserInteraction().favoriteId ? <FaStar size={22} className="text-light-yellow hover:cursor-pointer" onClick={handleFavorite} />
                                : <FaRegStar size={22} className="text-light-yellow hover:cursor-pointer" onClick={handleFavorite} />
                            }
                            <span>{reco.getFavorites()}</span>
                        </div>
                        <Button
                            label="X"
                            handleClick={onClose}
                            className="ml-2 px-2 font-semibold bg-light-grey border border-dark hover:bg-light-lightgrey"
                        />
                    </div>
                </div>

                <p className="text-sm md:text-base">{reco.getDescription()}</p>

                <div className="flex flex-col">
                    <p className="text-sm md:text-base">Anime{reco.getAnimes().length > 1 ? "s" : ""} sélectionné{reco.getAnimes().length > 1 ? "s" : ""} :{reco.getAnimes().length === 0 && <span className="text-xs md:text-sm font-semibold"> Aucun anime est sélectionné.</span>}</p>
                    {
                        reco.getAnimes().length > 0 && <ul className="list-disc pl-6">
                            {
                                reco.getAnimes().map(a => <li key={a.id}>
                                    <Link to={`/anime/${a.animeId}`} className="text-dark font-semibold hover:text-light-darkgrey">{a.title}</Link>
                                </li>)
                            }
                        </ul>
                    }
                </div>

                <p className="text-base md:text-lg font-semibold">{reco.getAuthor()}</p>
            </div>
        </div>
    </>
}