import { Controller, useForm, type FieldValues } from "react-hook-form";
import { useAuth } from "../context/AuthContext"
import { useState } from "react";
import { Button } from "./Button";
import type { EditUserFormData } from "../../../typings/EditUserFormData";

type ProfileEditModalProps = {
    onClose: () => void
}

export const ProfileEditModal = ({ onClose }: ProfileEditModalProps) => {
    const { user, updateUser } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const [ isUpdating, setIsUpdating ] = useState<boolean>(false);

    const handleFormSubmit = async (values: FieldValues) => {
        const data = values as EditUserFormData;

        setIsUpdating(true);

        try {
            await updateUser(data.username);
            onClose();
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        } finally {
            setIsUpdating(false);
        }
    }

    return <>
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-[100dvh] bg-black/30 z-30">
            <div className="flex flex-col items-center gap-2 py-4 px-8 bg-light-grey rounded-xl">
                <h3 className="text-xl md:text-2xl font-semibold">Modifier ses informations</h3>

                <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2 w-full">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="username_input" className="w-fit text-base md:text-lg">Titre</label>
                        <Controller
                            rules={{ required: true }}
                            control={control}
                            name="username"
                            defaultValue={user?.getUsername() ?? ""}
                            render={({field}) => <input
                                {...field}
                                id="username_input"
                                className={`w-full px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light ${errors.username && "border-light-red"}`}
                                disabled={isUpdating}
                            />}
                        />
                    </div>

                    <div className="flex justify-between">
                        <Button
                            label="Enregistrer"
                            className="w-2/5 mx-auto py-1 px-2 font-semibold bg-light-green hover:bg-light-lightgreen"
                            disable={isUpdating}
                        />
                        <Button
                            label="Annuler"
                            type="button"
                            className="w-2/5 mx-auto py-1 px-2 font-semibold bg-light-lightgrey hover:bg-light"
                            handleClick={onClose}
                            disable={isUpdating}
                        />
                    </div>
                </form>
            </div>
        </div>
    </>
}