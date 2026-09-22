import { Controller, useForm, type FieldValues } from "react-hook-form"
import { Button } from "./Button";
import type { RegisterFormData } from "../../../typings/RegisterFormData";
import type { FormErrors } from "../../../typings/FormErrors";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export const RegisterForm = () => {
    const { register } = useAuth();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();
    const [ success, setSuccess ] = useState<boolean>(false);
    const [ formError, setFormError ] = useState<string | null>(null);

    const handleFormSubmit = async (values: FieldValues) => {
        setFormError(null);

        const data = values as RegisterFormData;
        let formErrors: FormErrors[] = [];

        if (data.username.trim().length < 3) formErrors.push({ field: "username", message: "Le pseudonyme doit avoir 4 caractères minimums" });
        if (!data.email.trim().match(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gi)) formErrors.push({ field: "email", message: "Format invalide" });
        if (!data.password.trim().match(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gi)) formErrors.push({ field: "password", message: "Le mot de passe doit contenir 8 caractères dont une maj, une min, un chiffre et un caractère spécial" });

        if (formErrors.length > 0) {
            formErrors.forEach(err => {
                setError(err.field, { message: err.message });
            });

            return
        }

        try {
            const payload: RegisterFormData = {
                username: data.username,
                email: data.email,
                password: data.password
            }

            const response = await register(payload);

            if (response) return setFormError(response);

            setSuccess(true);
            setTimeout(() => setSuccess(false), 3000);
        } catch (err) {
            console.error(err)
            throw new Error("Une erreur est survenue");
        }
    }

    return <>
        {
            success && <p className="px-2 py-1 bg-light-green text-sm md:text-base font-semibold rounded-lg dark:bg-dark-green dark:text-light">Votre compte a été crée avec succès !</p>
        }
        <div className="w-full md:w-1/2 xl:w-[30%] p-4 bg-light-grey rounded-lg shadow-md shadow-black/20 dark:bg-dark-grey dark:shadow-light-grey/20">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1 md:gap-2">
                    <label className="text-sm md:text-base dark:text-light">Pseudonyme</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="username"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            type="text"
                            className={`px-2 py-1 bg-light-lightgrey rounded-lg border-1 shadow-custom-1 shadow-black/20 ${errors.username && "border-light-red dark:!border-dark-red"} dark:bg-dark-grey dark:border-light dark:shadow-light-grey/20 dark:text-light dark:placeholder:text-dark-lightgrey`}
                        />}
                    />
                </div>

                {
                    (errors.username && errors.username.message) && <p className="text-xs md:text-sm text-light-red text-center dark:text-dark-red">{errors.username.message as string}</p>
                }

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1 md:gap-2">
                    <label className="text-sm md:text-base dark:text-light">E-mail</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="email"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            type="email"
                            className={`px-2 py-1 bg-light-lightgrey rounded-lg border-1 shadow-custom-1 shadow-black/20 ${errors.email && "border-light-red dark:!border-dark-red"} dark:bg-dark-grey dark:border-light dark:shadow-light-grey/20 dark:text-light dark:placeholder:text-dark-lightgrey`}
                        />}
                    />
                </div>

                {
                    (errors.email && errors.email.message) && <p className="text-xs md:text-sm text-light-red text-center dark:text-dark-red">{errors.email.message as string}</p>
                }

                <div className="flex flex-col md:flex-row justify-between md:items-center gap-1 md:gap-2">
                    <label className="text-sm md:text-base dark:text-light">Mot de passe</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="password"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            type="password"
                            className={`px-2 py-1 bg-light-lightgrey rounded-lg border-1 shadow-custom-1 shadow-black/20 ${errors.password && "border-light-red dark:!border-dark-red"} dark:bg-dark-grey dark:border-light dark:shadow-light-grey/20 dark:text-light dark:placeholder:text-dark-lightgrey`}
                        />}
                    />
                </div>

                {
                    (errors.password && errors.password.message) && <p className="text-xs md:text-sm text-light-red text-center dark:text-dark-red">{errors.password.message as string}</p>
                }
                {
                    formError && <p className="text-sm md:text-base text-light-red text-center dark:text-dark-red">{formError}</p>
                }

                <Button
                    label="S'inscrire"
                    className="p-1 bg-light-green font-semibold hover:bg-light-lightgreen dark:bg-dark-green dark:hover:bg-dark-lightgreen dark:text-light"
                />
            </form>
        </div>
    </>
}