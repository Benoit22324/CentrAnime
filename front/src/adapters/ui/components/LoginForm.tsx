import { Controller, useForm, type FieldValues } from "react-hook-form"
import { Button } from "./Button";
import type { LoginFormData } from "../../../typings/LoginFormData";
import type { FormErrors } from "../../../typings/FormErrors";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const LoginForm = () => {
    const { login } = useAuth();
    const {
        control,
        handleSubmit,
        formState: { errors },
        setError
    } = useForm();
    const [ formError, setFormError ] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleFormSubmit = async (values: FieldValues) => {
        setFormError(null);

        const data = values as LoginFormData;
        let formErrors: FormErrors[] = [];

        if (!data.email.trim().match(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gi)) formErrors.push({ field: "email", message: "Format invalide" });
        if (!data.password.trim()) formErrors.push({ field: "password", message: "Le mot de passe est requis" });

        if (formErrors.length > 0) {
            formErrors.forEach(err => {
                setError(err.field, { message: err.message });
            });

            return
        }

        try {
            const payload: LoginFormData = {
                email: data.email,
                password: data.password
            }

            const response = await login(payload);

            if (response) return setFormError(response);

            navigate("/");
        } catch (err) {
            console.error(err)
            throw new Error("Une erreur est survenue");
        }
    }

    return <>
        <div className="w-full md:w-fit p-4 bg-light-grey rounded-lg shadow-md shadow-black/20 dark:bg-dark-grey dark:shadow-light-grey/20">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
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
                    label="Se connecter"
                    className="p-1 bg-light-green font-semibold hover:bg-light-lightgreen dark:bg-dark-green dark:hover:bg-dark-lightgreen dark:text-light"
                />
            </form>
        </div>
    </>
}