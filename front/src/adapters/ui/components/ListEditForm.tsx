import { Controller, useForm, type FieldValues } from "react-hook-form"
import type AnimeList from "../../../domain/entities/AnimeList"
import type Recommandation from "../../../domain/entities/Recommandation"
import { useEffect, useState } from "react"
import type { ListAnimeType } from "../../../typings/ListAnimeType"
import { FaRegTrashAlt } from "react-icons/fa"
import { FaPlus } from "react-icons/fa6"
import { Button } from "./Button"
import { useNavigate } from "react-router-dom"
import AnimeListRepository from "../../data/api/AnimeListRepository"
import UpdateAnimeListUseCase from "../../../domain/usecases/UpdateAnimeListUseCase"
import RemoveAnimeALUseCase from "../../../domain/usecases/RemoveAnimeALUseCase"
import RecommandationRepository from "../../data/api/RecommandationRepository"
import UpdateRecommandationUseCase from "../../../domain/usecases/UpdateRecommandationUseCase"
import RemoveAnimeRecoUseCase from "../../../domain/usecases/RemoveAnimeRecoUseCase"
import type { EditAnimeListFormData } from "../../../typings/EditAnimeListFormData"
import type { EditRecommandationFormData } from "../../../typings/EditRecommandationFormData"

type ListEditFormProps = {
    aniList: AnimeList | null,
    reco: Recommandation | null,
    updateState: (type: string, list: AnimeList | Recommandation) => void
}

export const ListEditForm = ({ aniList, reco, updateState }: ListEditFormProps) => {
    const animeListRepository = new AnimeListRepository();
    const updateAnimeListUseCase = new UpdateAnimeListUseCase(animeListRepository);
    const removeAnimeALUseCase = new RemoveAnimeALUseCase(animeListRepository);

    const recommandationRepository = new RecommandationRepository();
    const updateRecommandationUseCase = new UpdateRecommandationUseCase(recommandationRepository);
    const removeAnimeRecoUseCase = new RemoveAnimeRecoUseCase(recommandationRepository);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();
    const [ animesData, setAnimesData ] = useState<ListAnimeType[]>([]);
    const [ deleteAnimesData, setDeleteAnimesData ] = useState<ListAnimeType[]>([]);
    const [ isUpdating, setIsUpdating ] = useState<boolean>(false);
    const [ isSuccess, setIsSuccess ] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleAnimesListChange = (type: string, anime: ListAnimeType) => {
        if (type === "delete") {
            const isAdded = deleteAnimesData.find(da => da.id === anime.id);

            if (isAdded) return

            const newList = [...deleteAnimesData, anime];

            setDeleteAnimesData(newList);
        } else if (type === "cancel") {
            const newList = deleteAnimesData.filter(da => da.id !== anime.id);

            setDeleteAnimesData(newList);
        }
    }

    const handleFormSubmit = async (values: FieldValues) => {
        setIsUpdating(true);
        try {
            if (aniList) {
                const data = values as EditAnimeListFormData;

                if (deleteAnimesData.length > 0) {
                    const deletePromises = deleteAnimesData.map(async da => await removeAnimeALUseCase.execute({ id: da.id }));

                    await Promise.all(deletePromises);
                }

                const updatedAniList = await updateAnimeListUseCase.execute({ id: aniList.getId(), title: data.title });

                if (updatedAniList) {
                    setDeleteAnimesData([]);
                    updateState("anilist", updatedAniList);
                    setIsSuccess(true);

                    setTimeout(() => setIsSuccess(false), 3000);
                }
            } else if (reco) {
                const data = values as EditRecommandationFormData;

                if (deleteAnimesData.length > 0) {
                    const deletePromises = deleteAnimesData.map(async da => await removeAnimeRecoUseCase.execute({ id: da.id }));

                    await Promise.all(deletePromises);
                }

                const updatedReco = await updateRecommandationUseCase.execute({ id: reco.getId(), title: data.title, description: data.description });

                if (updatedReco) {
                    setDeleteAnimesData([]);
                    updateState("reco", updatedReco);
                    setIsSuccess(true);

                    setTimeout(() => setIsSuccess(false), 3000);
                }
            }
        } catch(err) {
            throw new Error("Une erreur inattendue est survenue");
        } finally {
            setIsUpdating(false);
        }
    }

    useEffect(() => {
        setValue("title", aniList ? aniList.getTitle() : reco ? reco.getTitle() : "");
        setAnimesData(aniList ? aniList.getAnimes() : reco ? reco.getAnimes() : []);
    }, [aniList, reco])

    return <>
        <div className="w-[400px] p-4 bg-light-grey rounded-lg shadow-md shadow-black/20">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="title_input" className="w-1/4">Titre</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="title"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            id="title_input"
                            className={`w-3/4 px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light ${errors.title && "border-light-red"}`}
                            disabled={isUpdating}
                        />}
                    />
                </div>

                {
                    reco && <div className="flex justify-between gap-2">
                        <label htmlFor="description_textarea" className="w-1/4">Description</label>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="description"
                            defaultValue={reco.getDescription()}
                            render={({field}) => <textarea
                                {...field}
                                id="description_textarea"
                                cols={3}
                                className={`w-3/4 px-2 py-1 bg-light-lightgrey text-light-darkgrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 resize-none ${errors.description && "border-light-red"} dark:bg-dark-grey dark:border-light`}
                                disabled={isUpdating}
                            />}
                        />
                    </div>
                }

                <p className="text-lg">Anime{animesData.length > 1 ? "s" : ""} sélectionnée{animesData.length > 1 ? "s" : ""} :</p>
                {
                    animesData.length > 0 ? <ul className="h-[85%] pl-8 list-disc overflow-y-auto scrollbar-none dark:text-light">
                        {animesData.map(a => <li key={a.id}>
                            <div className="flex justify-between items-center">
                                <span className="font-semibold">{a.title}</span>
                                {
                                    deleteAnimesData.find(da => da.id === a.id) ? <FaPlus
                                        size={16}
                                        className={`text-light-blue dark:text-light-lightblue ${!isUpdating ? "hover:cursor-pointer hover:scale-90" : ""}`}
                                        onClick={() => !isUpdating && handleAnimesListChange("cancel", a)}
                                    />
                                    : <FaRegTrashAlt
                                        size={16}
                                        className={`text-light-red dark:text-light-lightred ${!isUpdating ? "hover:cursor-pointer hover:scale-90" : ""}`}
                                        onClick={() => !isUpdating && handleAnimesListChange("delete", a)}
                                    />
                                }
                            </div>
                        </li>)}
                    </ul>
                    : <span className="text-xs md:text-sm font-semibold"> Aucun anime est sélectionné.</span>
                }

                {
                    isSuccess && <span className="text-light-green font-semibold text-center">Les modifications ont été appliquées !</span>
                }

                <div className="flex justify-between">
                    <Button
                        label="Valider"
                        className="w-2/5 mx-auto py-1 px-2 font-semibold bg-light-green hover:bg-light-lightgreen"
                        disable={isUpdating}
                    />
                    <Button
                        label="Annuler"
                        type="button"
                        className="w-2/5 mx-auto py-1 px-2 font-semibold bg-light-lightgrey hover:bg-light"
                        handleClick={() => aniList ? navigate("/ani-list") : navigate("/reco")}
                        disable={isUpdating}
                    />
                </div>
            </form>
        </div>
    </>
}