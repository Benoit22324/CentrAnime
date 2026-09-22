import { Controller, useForm, type FieldValues } from "react-hook-form";
import { Button } from "./Button";
import type { CreateAnimeListFormData } from "../../../typings/CreateAnimeListFormData";
import type { CreateRecommandationFormData } from "../../../typings/CreateRecommandationFormData";
import AnimeListRepository from "../../data/api/AnimeListRepository";
import CreateAnimeListUseCase from "../../../domain/usecases/CreateAnimeListUseCase";
import { useState } from "react";
import RecommandationRepository from "../../data/api/RecommandationRepository";
import CreateRecommandationUseCase from "../../../domain/usecases/CreateRecommandationUseCase";

export const ListCreationForm = () => {
    const animeListRepository = new AnimeListRepository();
    const createAnimeListUseCase = new CreateAnimeListUseCase(animeListRepository);

    const recommandationRepository = new RecommandationRepository();
    const createRecommandationUseCase = new CreateRecommandationUseCase(recommandationRepository);

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();
    const [ isSuccess, setIsSuccess ] = useState<boolean>(false);
    const [ isAdding, setIsAdding ] = useState<boolean>(false);

    const handleFormSubmit = async (values: FieldValues) => {
        setIsAdding(true);

        try {
            // Si le type sélectionné est "AnimeList"
            if (values.type === "AnimeList") {
                // Assignation du bon type
                const data = values as CreateAnimeListFormData;

                // Création de la liste d'anime
                await createAnimeListUseCase.execute({
                    title: data.title
                });

                // Réinitialisation des champs & Affichage temporaire du message de succès
                setIsSuccess(true);
                reset();

                setTimeout(() => setIsSuccess(false), 3000);
            // Si le type sélectionné est "Recommandation"
            } else if (values.type === "Recommandation") {
                // Assignation du bon type
                const data = values as CreateRecommandationFormData;

                // Création de la liste de recommandation
                await createRecommandationUseCase.execute({
                    title: data.title,
                    description: data.description
                })

                // Réinitialisation des champs & Affichage temporaire du message de succès
                setIsSuccess(true);
                reset();

                setTimeout(() => setIsSuccess(false), 3000);
            }
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue")
        } finally {
            setIsAdding(false);
        }
        
    }

    return <>
        <div className="w-full md:w-[400px] p-4 bg-light-grey rounded-lg shadow-md shadow-black/20 dark:bg-dark-grey dark:shadow-light-grey/20">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2">
                    <label htmlFor="title_input" className="w-full md:w-1/4 dark:text-light">Titre</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="title"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            id="title_input"
                            className={`w-full md:w-3/4 px-2 py-1 bg-light-lightgrey rounded-lg border-1 shadow-custom-1 shadow-black/20 ${errors.title && "border-light-red dark:!border-dark-red"} dark:bg-dark-grey dark:border-light dark:shadow-light-grey/20 dark:text-light dark:placeholder:text-dark-lightgrey`}
                            disabled={isAdding}
                        />}
                    />
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-1 md:gap-2">
                    <label htmlFor="type_select" className="w-full md:w-1/4 dark:text-light">Type</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="type"
                        defaultValue={""}
                        render={({field}) => <select
                            {...field}
                            id="type_select"
                            className={`w-full md:w-3/4 px-2 py-1 bg-light-lightgrey text-light-darkergrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 ${errors.type && "border-light-red dark:!border-dark-red"} dark:bg-dark-grey dark:border-light dark:shadow-light-grey/20 dark:text-light dark:placeholder:text-dark-lightgrey`}
                            disabled={isAdding}
                        >
                            <option value={""} hidden>Sélectionner le type</option>
                            <option value={"AnimeList"}>Liste d'anime</option>
                            <option value={"Recommandation"}>Recommandation</option>
                        </select>}
                    />
                </div>

                {
                    watch("type") === "Recommandation" && <div className="flex flex-col md:flex-row justify-between gap-1 md:gap-2">
                        <label htmlFor="description_textarea" className="w-full md:w-1/4 dark:text-light">Description</label>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="description"
                            defaultValue={""}
                            render={({field}) => <textarea
                                {...field}
                                id="description_textarea"
                                rows={3}
                                className={`w-full md:w-3/4 px-2 py-1 bg-light-lightgrey text-light-darkergrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 resize-none ${errors.description && "border-light-red dark:!border-dark-red"} dark:bg-dark-grey dark:border-light dark:shadow-light-grey/20 dark:text-light dark:placeholder:text-dark-lightgrey`}
                                disabled={isAdding}
                            />}
                        />
                    </div>
                }

                {
                    isSuccess && <span className="text-light-green font-semibold text-center">Liste ajoutée avec succès !</span>
                }

                <Button
                    label="Valider"
                    className="w-fit mx-auto py-2 px-4 font-semibold bg-light-green hover:bg-light-lightgreen dark:bg-dark-green dark:hover:bg-dark-lightgreen dark:text-light"
                    disable={isAdding}
                />
            </form>
        </div>
    </>
}