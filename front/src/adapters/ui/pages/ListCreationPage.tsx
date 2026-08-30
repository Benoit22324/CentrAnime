import { ListCreationForm } from "../components/ListCreationForm"

export const ListCreationPage = () => {
    return <>
        <div className="flex flex-col justify-center items-center gap-2 h-[80vh]">
            <h1 className="text-2xl font-semibold dark:text-light">Créer une liste</h1>
            <p className="text-sm md:text-base">Les animes doivent être ajoutés directement sur leur page.</p>

            <ListCreationForm />
        </div>
    </>
}