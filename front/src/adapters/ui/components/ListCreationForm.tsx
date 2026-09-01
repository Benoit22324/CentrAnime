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
            if (values.type === "AnimeList") {
                const data = values as CreateAnimeListFormData;

                await createAnimeListUseCase.execute({
                    title: data.title
                });

                setIsSuccess(true);
                reset();

                setTimeout(() => setIsSuccess(false), 3000);
            } else if (values.type === "Recommandation") {
                const data = values as CreateRecommandationFormData;

                await createRecommandationUseCase.execute({
                    title: data.title,
                    description: data.description
                })

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
                            disabled={isAdding}
                        />}
                    />
                </div>

                <div className="flex justify-between items-center gap-2">
                    <label htmlFor="type_select" className="w-1/4">Type</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="type"
                        defaultValue={""}
                        render={({field}) => <select
                            {...field}
                            id="type_select"
                            className={`w-3/4 px-2 py-1 bg-light-lightgrey text-light-darkgrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 ${errors.type && "border-light-red"} dark:bg-dark-grey dark:border-light`}
                            disabled={isAdding}
                        >
                            <option value={""} hidden>Sélectionner le type</option>
                            <option value={"AnimeList"}>Liste d'anime</option>
                            <option value={"Recommandation"}>Recommandation</option>
                        </select>}
                    />
                </div>

                {
                    watch("type") === "Recommandation" && <div className="flex justify-between gap-2">
                        <label htmlFor="description_textarea" className="w-1/4">Description</label>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="description"
                            defaultValue={""}
                            render={({field}) => <textarea
                                {...field}
                                id="description_textarea"
                                rows={3}
                                className={`w-3/4 px-2 py-1 bg-light-lightgrey text-light-darkgrey rounded-lg border border-dark shadow-custom-1 shadow-black/20 resize-none ${errors.description && "border-light-red"} dark:bg-dark-grey dark:border-light`}
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
                    className="w-fit mx-auto py-2 px-4 font-semibold bg-light-green hover:bg-light-lightgreen"
                    disable={isAdding}
                />
            </form>
        </div>
    </>
}