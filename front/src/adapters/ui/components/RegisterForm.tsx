import { Controller, useForm, type FieldValues } from "react-hook-form"
import { Button } from "./Button";

export const RegisterForm = () => {
    const {
        control,
        handleSubmit
    } = useForm();

    const handleFormSubmit = (data: FieldValues) => {
        console.log(data)
    }

    return <>
        <div className="p-4 bg-light-grey rounded-lg shadow-md shadow-black/20">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="flex flex-col gap-2">
                <div className="flex justify-between items-center gap-2">
                    <label>Pseudonyme</label>
                    <Controller
                        rules={{ required: true, minLength: 4 }}
                        control={control}
                        name="username"
                        defaultValue={""}
                        render={({field}) => <input
                            {...field}
                            type="text"
                            className="px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light"
                        />}
                    />
                </div>

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
                            className="px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light"
                        />}
                    />
                </div>

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
                            className="px-2 py-1 bg-light-lightgrey rounded-lg border-1 dark:bg-dark-grey dark:border-light"
                        />}
                    />
                </div>

                <Button
                    label="S'inscrire"
                    className="p-1 bg-light-green font-semibold hover:bg-light-lightgreen"
                />
            </form>
        </div>
    </>
}