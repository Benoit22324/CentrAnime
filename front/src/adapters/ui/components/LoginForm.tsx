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
        <div className="p-4 bg-light-grey rounded-lg shadow-md shadow-black/20">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
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
                    label="Se connecter"
                    className="p-1 bg-light-green font-semibold hover:bg-light-lightgreen"
                />
            </form>
        </div>
    </>
}