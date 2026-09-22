import { Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Button } from "./Button"
import { ThemeToggler } from "./ThemeToggler"
import { useAuth } from "../context/AuthContext"

export const Header = () => {
    const { user, logout } = useAuth();

    return <>
        <header className="flex justify-start lg:justify-between items-center gap-4 p-3 lg:p-6 pb-1 lg:pb-2">
            <div className="flex flex-col lg:flex-row items-start lg:items-center">
                <div className="nav_anchor w-fit px-1 lg:px-2 py-2 lg:py-4 bg-black/20 rounded-lg dark:bg-white/30">
                    <Link to={"/"}>
                        <p className="p-1 lg:p-2 text-xl font-semibold dark:text-light">CentrAnime</p>
                    </Link>
                </div>

                <Navbar />
            </div>

            <div className="flex justify-between items-center gap-4">
                <ThemeToggler />

                {
                    user ? <Button
                            label="Se déconnecter"
                            className="hidden lg:flex p-2 font-semibold bg-light-red hover:bg-light-lightred dark:text-light dark:bg-dark-red dark:hover:bg-dark-lightred"
                            handleClick={logout}
                        />
                    : <>
                        <Link to={"/login"}>
                            <Button
                                label="Se connecter"
                                className="hidden lg:flex p-2 font-semibold bg-light-blue hover:bg-light-lightblue dark:text-light dark:bg-dark-blue dark:hover:bg-dark-lightblue"
                            />
                        </Link>

                        <Link to={"/register"}>
                            <Button
                                label="S'inscrire"
                                className="hidden lg:flex p-2 font-semibold bg-light-yellow hover:bg-light-lightyellow dark:text-light dark:bg-dark-yellow dark:hover:bg-dark-lightyellow"
                            />
                        </Link>
                    </>
                }
            </div>
        </header>
    </>
}