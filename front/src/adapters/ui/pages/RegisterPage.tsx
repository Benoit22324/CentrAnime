import { RegisterForm } from "../components/RegisterForm"

export const RegisterPage = () => {
    return <>
        <div className="flex flex-col justify-center items-center gap-4 h-[80vh]">
            <h2 className="text-2xl font-semibold dark:text-light">Créer son compte</h2>

            <RegisterForm />
        </div>
    </>
}