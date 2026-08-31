import DOMPurify from "dompurify";
import { useNavigate, useParams } from "react-router-dom"
import AnimeRepository from "../../data/api/AnimeRepository";
import GetAnimeByIdUseCase from "../../../domain/usecases/GetAnimeByIdUseCase";
import { useEffect, useState } from "react";
import Anime from "../../../domain/entities/Anime";
import { useAuth } from "../context/AuthContext";
import { AnimeOpinion } from "../components/AnimeOpinion";
import OpinionRepository from "../../data/api/OpinionRepository";
import GetOpinionUseCase from "../../../domain/usecases/GetOpinionUseCase";
import Opinion from "../../../domain/entities/Opinion";
import CreateOpinionUseCase from "../../../domain/usecases/CreateOpinionUseCase";
import UpdateOpinionUseCase from "../../../domain/usecases/UpdateOpinionUseCase";
import type { OpinionFormData } from "../../../typings/OpinionFormData";
import { Button } from "../components/Button";
import AnimeListRepository from "../../data/api/AnimeListRepository";
import GetAnimeListsUseCase from "../../../domain/usecases/GetAnimeListsUseCase";
import AddAnimeALUseCase from "../../../domain/usecases/AddAnimeALUseCase";
import AnimeList from "../../../domain/entities/AnimeList";
import RecommandationRepository from "../../data/api/RecommandationRepository";
import GetRecommandationsUseCase from "../../../domain/usecases/GetRecommandationsUseCase";
import AddAnimeRecoUseCase from "../../../domain/usecases/AddAnimeRecoUseCase";
import type Recommandation from "../../../domain/entities/Recommandation";

export const AnimePage = () => {
    const { user } = useAuth();
    const { id } = useParams();

    const animeRepository = new AnimeRepository();
    const getAnimeByIdUseCase = new GetAnimeByIdUseCase(animeRepository);

    const opinionRepository = new OpinionRepository();
    const getOpinionUseCase = new GetOpinionUseCase(opinionRepository);
    const createOpinionUseCase = new CreateOpinionUseCase(opinionRepository);
    const updateOpinionUseCase = new UpdateOpinionUseCase(opinionRepository);

    const animeListRepository = new AnimeListRepository();
    const getAnimeListsUseCase = new GetAnimeListsUseCase(animeListRepository);
    const addAnimeALUseCase = new AddAnimeALUseCase(animeListRepository);

    const recommandationRepository = new RecommandationRepository();
    const getRecommandationsUseCase = new GetRecommandationsUseCase(recommandationRepository);
    const addAnimeRecoUseCase = new AddAnimeRecoUseCase(recommandationRepository);

    const [ animeData, setAnimeData ] = useState<Anime | null>(null);
    const [ opinionData, setOpinionData ] = useState<Opinion | null>(null);
    const [ animeListData, setAnimeListData ] = useState<AnimeList[] | null>(null);
    const [ recommandationData, setRecommandationData ] = useState<Recommandation[] | null>(null);
    const [ selectedList, setSelectedList ] = useState<string>("");
    const [ alreadyAddedAnime, setAlreadyAddedAnime ] = useState<boolean>(false);
    const navigate = useNavigate();

    const translateStatus = (status: string) => {
        switch(status) {
            case "FINISHED":
                return "Fini";
            case "RELEASING":
                return "En cours";
            default:
                return status;
        }
    }

    const handleOpinionChange = async (viewStatus: string | null, note: number | null, comment: string | null) => {
        if (!user || !animeData) return

        try {
            const data: OpinionFormData = {};

            if (viewStatus) data["viewStatus"] = viewStatus;
            if (note) data["note"] = note;
            if (comment) data["comment"] = comment;

            if (opinionData) {
                const updatedOpinion = await updateOpinionUseCase.execute({ id: opinionData.getId(), data: {
                    ...opinionData,
                    ...data
                } });

                setOpinionData(updatedOpinion);
            } else {
                const updatedOpinion = await createOpinionUseCase.execute({ animeId: animeData.getId(), data });

                setOpinionData(updatedOpinion);
            }
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const handleListChange = (listId: string) => {
        if (!animeListData && !recommandationData) return

        const selectedAL = animeListData?.find(al => al.getId() === listId);
        const selectedReco = recommandationData?.find(reco => reco.getId() === listId);

        if (!selectedAL && !selectedReco) return

        const isAdded = (selectedAL || selectedReco)?.getAnimes().find(a => a.animeId === id);

        if (isAdded) setAlreadyAddedAnime(true);
        else setAlreadyAddedAnime(false);

        setSelectedList(listId);
    }

    const handleAddAnime = async () => {
        if (!selectedList || !id || !user || (!animeListData && !recommandationData)) return

        try {
            const selectedAL = animeListData?.find(al => al.getId() === selectedList);
            const selectedReco = recommandationData?.find(reco => reco.getId() === selectedList);

            if (animeListData && selectedAL) {
                const anilist = await addAnimeALUseCase.execute({ anilistId: selectedList, animeId: id });

                if (anilist) {
                    const updatedList = animeListData.map(al => al.getId() === anilist.getId() ? anilist : al);

                    setAnimeListData(updatedList);
                    setAlreadyAddedAnime(true);
                }
            } else if (recommandationData && selectedReco) {
                const recommandation = await addAnimeRecoUseCase.execute({ recoId: selectedList, animeId: id });

                if (recommandation) {
                    const updatedList = recommandationData.map(reco => reco.getId() === recommandation.getId() ? recommandation : reco);

                    setRecommandationData(updatedList);
                    setAlreadyAddedAnime(true);
                }
            }
        } catch (error) {
            throw new Error("Une erreur est survenue");
        }
    }

    const fetchAnime = async () => {
        if (!id) return navigate("/");

        try {
            const anime = await getAnimeByIdUseCase.execute({ id });

            setAnimeData(anime);
        } catch(err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchOpinion = async () => {
        if (!id || !user) return

        try {
            const response = await getOpinionUseCase.execute({ animeId: id })

            setOpinionData(response);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchList = async () => {
        if (!user) return

        try {
            const anilists = await getAnimeListsUseCase.execute();
            const recommandations = await getRecommandationsUseCase.execute();

            setAnimeListData(anilists);
            setRecommandationData(recommandations);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue")
        }
    }

    useEffect(() => {
        fetchAnime();
    }, [])

    useEffect(() => {
        fetchOpinion();
        fetchList();
    }, [ user ])

    return <>
        {
            animeData && <>
                <h1 className="text-2xl md:text-4xl font-semibold">{animeData.getMainTitle()}</h1>

                <div className="flex gap-4 mt-4">
                    <div className="flex flex-col w-1/7 p-3 bg-light-grey rounded-lg shadow-custom-1 shadow-black/20">
                        <img src={animeData.getPosterUrl()} alt={animeData.getMainTitle() + " poster"} className="mb-3 rounded-xl" />
                        <span className="text-base md:text-lg"><span className="font-semibold">EN :</span> {animeData.getEnTitle()}</span>
                        <span className="text-base md:text-lg"><span className="font-semibold">Studio :</span> {animeData.getStudio()}</span>
                        <span className="text-base md:text-lg"><span className="font-semibold">Episode{animeData.getEpisodes() > 1 ? "s" : ""} :</span> {animeData.getEpisodes()}</span>
                        <span className="text-base md:text-lg"><span className="font-semibold">Popularité :</span> {animeData.getPopularity()}</span>
                        <span className="text-base md:text-lg"><span className="font-semibold">Statut :</span> {translateStatus(animeData.getStatus())}</span>
                        <span className="text-base md:text-lg"><span className="font-semibold">Type :</span> {animeData.getType()}</span>
                        <span className="text-base md:text-lg font-semibold">Genres :</span>
                        <span className="text-sm md:text-base">{animeData.getGenres().join(", ")}</span>
                    </div>
                    <div className="flex flex-col gap-2 w-4/7">
                        <div className="p-3 bg-light-grey rounded-lg shadow-custom-1 shadow-black/20">
                            <h2 className="mb-2 text-xl md:text-2xl font-semibold">Synopsis :</h2>
                            <p className="text-sm md:text-base" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(animeData.getSynopsis()) }}></p>
                        </div>

                        <div className="flex gap-2">
                            <div className="flex flex-col p-3 bg-light-grey rounded-lg shadow-custom-1 shadow-black/20">
                                <span className="text-base md:text-lg">Score : {animeData.getScore()?.score}</span>
                                <span className="mb-2 text-lg md:text-xl font-semibold">Source :</span>
                                <span className="text-base md:text-lg"><a href={animeData.getScore()?.link} target="_blank" className="text-light-blue font-semibold hover:text-light-lightblue">{animeData.getScore()?.platformName}</a> - Score : {animeData.getScore()?.score}</span>
                            </div>
                            <div className="flex flex-col p-3 bg-light-grey rounded-lg shadow-custom-1 shadow-black/20">
                                <span className="text-base md:text-lg">Rang : {animeData.getRank()?.rank}</span>
                                <span className="mb-2 text-lg md:text-xl font-semibold">Source :</span>
                                <span className="text-base md:text-lg"><a href={animeData.getRank()?.link} target="_blank" className="text-light-blue font-semibold hover:text-light-lightblue">{animeData.getRank()?.platformName}</a> - Rang : {animeData.getRank()?.rank}</span>
                            </div>
                        </div>
                    </div>
                    {
                        user && <div className="flex flex-col gap-2 w-3/8">
                            <AnimeOpinion
                                opinion={opinionData}
                                handleOpinionChange={handleOpinionChange}
                            />

                            <div className="flex flex-col gap-1">
                                <h2 className="mb-1 text-xl md:text-2xl font-semibold">Ajouter dans une liste</h2>

                                <div className="flex items-center gap-4">
                                    <select
                                        value={selectedList}
                                        onChange={(e) => handleListChange(e.target.value)}
                                        className="w-2/3 px-2 py-1 bg-light-lightgrey text-sm text-light-darkgrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 dark:bg-dark-grey dark:border-light disabled:text-light-darkgrey/60"
                                        disabled={!animeListData && !recommandationData}
                                    >
                                        {
                                            (animeListData || recommandationData) ? <>
                                                <option value={""} hidden>Sélectionner une liste</option>
                                                {animeListData && animeListData.map(al => <option key={al.getId()} value={al.getId()}>{al.getTitle()} - Liste d'anime</option>)}
                                                {recommandationData && recommandationData.map(reco => <option key={reco.getId()} value={reco.getId()}>{reco.getTitle()} - Recommandation</option>)}
                                            </>
                                            : <option value={""} hidden>Aucune liste disponible</option>
                                        }
                                    </select>
                                    <Button
                                        label="Ajouter"
                                        className="px-2 py-1 font-semibold bg-light-blue hover:bg-light-lightblue"
                                        handleClick={handleAddAnime}
                                        disable={(!animeListData && !recommandationData) || alreadyAddedAnime}
                                    />
                                </div>
                                {
                                    alreadyAddedAnime && <span className="text-xs md:text-sm text-light-red font-semibold">L'anime est déjà ajouté à cette liste !</span>
                                }
                            </div>
                        </div>
                    }
                </div>
            </>
        }
    </>
}