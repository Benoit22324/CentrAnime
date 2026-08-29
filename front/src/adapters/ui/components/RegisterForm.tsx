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
            success && <p className="px-2 py-1 bg-light-green font-semibold rounded-lg">Votre compte a été crée avec succès !</p>
        }
        <div className="w-[30%] p-4 bg-light-grey rounded-lg shadow-md shadow-black/20">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                    <label>Pseudonyme</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="username"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            type="text"
                            className={`px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light ${errors.username && "border-light-red"}`}
                        />}
                    />
                </div>

                {
                    (errors.username && errors.username.message) && <p className="text-sm text-light-red text-center">{errors.username.message as string}</p>
                }

                <div className="flex justify-between items-center gap-2">
                    <label>E-mail</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="email"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            type="email"
                            className={`px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light ${errors.email && "border-light-red"}`}
                        />}
                    />
                </div>

                {
                    (errors.email && errors.email.message) && <p className="text-sm text-light-red text-center">{errors.email.message as string}</p>
                }

                <div className="flex justify-between items-center gap-2">
                    <label>Mot de passe</label>
                    <Controller
                        rules={{ required: true }}
                        control={control}
                        name="password"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            type="password"
                            className={`px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light ${errors.password && "border-light-red"}`}
                        />}
                    />
                </div>

                {
                    (errors.password && errors.password.message) && <p className="text-sm text-light-red text-center">{errors.password.message as string}</p>
                }
                {
                    formError && <p className="text-light-red text-center">{formError}</p>
                }

                <Button
                    label="S'inscrire"
                    className="p-1 bg-light-green font-semibold hover:bg-light-lightgreen"
                />
            </form>
        </div>
    </>
}