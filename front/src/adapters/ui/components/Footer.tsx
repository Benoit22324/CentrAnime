import { Link } from "react-router-dom"

export const Footer = () => {
    return <>
        <footer className="relative xl:fixed bottom-0 flex justify-between p-4 pt-2">
            <div className="flex flex-col pl-1 border-l-2 dark:border-light">
                <Link to={"/"} className="text-xs md:text-sm dark:text-light">Mentions Légales</Link>
                <Link to={"/"} className="text-xs md:text-sm dark:text-light">Politique de confidentialité</Link>
            </div>
        </footer>
    </>
}