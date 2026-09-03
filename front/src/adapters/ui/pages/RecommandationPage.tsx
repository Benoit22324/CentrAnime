import { useEffect, useState } from "react";
import Recommandation from "../../../domain/entities/Recommandation";
import { Pagination } from "../components/Pagination";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import RecommandationRepository from "../../data/api/RecommandationRepository";
import GetRecommandationOffsetUseCase from "../../../domain/usecases/GetRecommandationOffsetUseCase";
import { RecommandationItem } from "../components/RecommandationItem";
import { useAuth } from "../context/AuthContext";
import AddFavoriteRecoUseCase from "../../../domain/usecases/AddFavoriteRecoUseCase";
import RemoveFavoriteRecoUseCase from "../../../domain/usecases/RemoveFavoriteRecoUseCase";
import AddLikeRecoUseCase from "../../../domain/usecases/AddLikeRecoUseCase";
import RemoveLikeRecoUseCase from "../../../domain/usecases/RemoveLikeRecoUseCase";
import DeleteRecommandationUseCase from "../../../domain/usecases/DeleteRecommandationUseCase";

export const RecommandationPage = () => {
    const { user } = useAuth();

    const recommandationRepository = new RecommandationRepository();
    const getRecommandationOffsetUseCase = new GetRecommandationOffsetUseCase(recommandationRepository);
    const deleteRecommandationUseCase = new DeleteRecommandationUseCase(recommandationRepository);

    const addFavoriteRecoUseCase = new AddFavoriteRecoUseCase(recommandationRepository);
    const removeFavoriteRecoUseCase = new RemoveFavoriteRecoUseCase(recommandationRepository);

    const addLikeRecoUseCase = new AddLikeRecoUseCase(recommandationRepository);
    const removeLikeRecoUseCase = new RemoveLikeRecoUseCase(recommandationRepository);

    const [ selectedPage, setSelectedPage ] = useState<number>(0);
    const [ totalPage, setTotalPage ] = useState<number>(0);
    const [ recommandationData, setRecommandationData ] = useState<Recommandation[] | null>(null);

    const handleFavoriteReco = async (type: string, id: string) => {
        if (!user || !recommandationData) return

        try {
            if (type === "Add") {
                const reco = await addFavoriteRecoUseCase.execute({ recoId: id });

                if (!reco) return

                const updatedList = recommandationData.map(r => r.getId() === reco.getId() ? reco : r);

                setRecommandationData(updatedList);
            } else if (type === "Remove") {
                await removeFavoriteRecoUseCase.execute({ id });

                const updatedList = recommandationData.map(r => r.getUserInteraction().favoriteId === id ? new Recommandation(
                    r.getId(),
                    r.getTitle(),
                    r.getDescription(),
                    r.getAnimes(),
                    r.getAuthor(),
                    r.getIsOwner(),
                    {
                        ...r.getUserInteraction(),
                        favoriteId: ""
                    },
                    r.getLikes(),
                    r.getFavorites() - 1
                ) : r);

                setRecommandationData(updatedList);
            }
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const handleLikeReco = async (type: string, id: string) => {
        if (!user || !recommandationData) return

        try {
            if (type === "Add") {
                const reco = await addLikeRecoUseCase.execute({ recoId: id });

                if (!reco) return

                const updatedList = recommandationData.map(r => r.getId() === reco.getId() ? reco : r);

                setRecommandationData(updatedList);
            } else if (type === "Remove") {
                await removeLikeRecoUseCase.execute({ id });

                const updatedList = recommandationData.map(r => r.getUserInteraction().likeId === id ? new Recommandation(
                    r.getId(),
                    r.getTitle(),
                    r.getDescription(),
                    r.getAnimes(),
                    r.getAuthor(),
                    r.getIsOwner(),
                    {
                        ...r.getUserInteraction(),
                        likeId: ""
                    },
                    r.getLikes() - 1,
                    r.getFavorites()
                ) : r);

                setRecommandationData(updatedList);
            }
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const deleteReco = async (recoId: string) => {
        try {
            await deleteRecommandationUseCase.execute({ id: recoId });

            await fetchRecommandation();
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchRecommandation = async () => {
        try {
            const response = await getRecommandationOffsetUseCase.execute({ selectedPage, maxItems: 12 });

            setRecommandationData(response.recommandations);
            setTotalPage(response.total);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    useEffect(() => {
        fetchRecommandation();
    }, [selectedPage, user])

    return <>
        <div className="flex justify-center items-end gap-2 mb-4">
            <h1 className="text-4xl font-semibold text-center dark:text-light">Liste de recommandations</h1>
            {
                user && <Link
                    to={"/create-list"}
                    className={`p-1.5 font-semibold bg-light-grey border border-dark hover:bg-light-lightgrey rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95`}
                >
                    <FaPlus size={20} />
                </Link>
            }
        </div>

        <div className="flex justify-center flex-wrap gap-6 w-[90%] mx-auto my-4">
            {
                (recommandationData && recommandationData.length > 0) ? recommandationData.map(reco => <RecommandationItem
                    key={reco.getId()}
                    reco={reco}
                    handleFavorite={handleFavoriteReco}
                    handleLike={handleLikeReco}
                    deleteList={deleteReco}
                />)
                : <span className="text-lg md:text-xl font-semibold">Aucune recommandation trouvée.</span>
            }
        </div>

        <Pagination
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            totalPage={recommandationData ? totalPage : null}
        />
    </>
}