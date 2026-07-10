import { Link } from "react-router-dom"
import { Navbar } from "./Navbar"
import { Button } from "./Button"
import { ThemeToggler } from "./ThemeToggler"

export const Header = () => {
    return <>
        <header className="flex justify-between items-center p-6 pb-2">
            <div className="flex items-center">
                <div className="w-fit px-2 py-4 bg-black/20 rounded-lg dark:bg-white/20">
                    <Link to={"/"}>
                        <p className="px-2 py-2 text-xl font-semibold">CentrAnime</p>
                    </Link>
                </div>

                <Navbar />
            </div>

            <div className="flex justify-between items-center gap-4">
                <ThemeToggler />

                <Link to={"/login"}>
                    <Button
                        label="Se connecter"
                    />
                </Link>

                <Link to={"/register"}>
                    <Button
                        label="S'inscrire"
                        className="p-2 font-semibold bg-light-yellow hover:bg-light-lightyellow"
                    />
                </Link>
            </div>
        </header>
    </>
}