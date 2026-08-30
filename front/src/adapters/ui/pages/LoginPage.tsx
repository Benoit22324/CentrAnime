import { LoginForm } from "../components/LoginForm"

export const LoginPage = () => {
    return <>
        <div className="flex flex-col justify-center items-center gap-4 h-[80vh]">
            <h1 className="text-2xl font-semibold dark:text-light">Se connecter à son compte</h1>

            <LoginForm />
        </div>
    </>
}