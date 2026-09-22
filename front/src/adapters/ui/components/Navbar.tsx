import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { user, logout } = useAuth();
    const { pathname } = useLocation();
    const [ extended, setExtended ] = useState<boolean>(true);

    const selectedColor = (path: string) => {
        if (pathname === path) return "p-2 bg-light-lightblue text-sm lg:text-base dark:text-light dark:bg-dark-lightblue";
        return "p-2 bg-light-grey text-sm lg:text-base hover:bg-light-lightgrey dark:text-light dark:bg-dark-grey dark:hover:bg-dark-darkgrey";
    }

    return <>
        <nav className={`absolute nav_mobile_bar z-20 lg:relative flex flex-col lg:flex-row items-start lg:items-center gap-2 lg:gap-4 px-3 ${extended ? "py-2 rounded-tr-lg" : ""} lg:p-3 bg-black/20 rounded-b-lg lg:rounded-bl-none lg:rounded-r-lg dark:bg-white/30`}>
            {
                extended ? <>
                    <Link to={"/"}>
                        <Button
                            label="Catalogue"
                            className={selectedColor("/")}
                        />
                    </Link>

                    <Link to={"/reco"}>
                        <Button
                            label="Recommandation"
                            className={selectedColor("/reco")}
                        />
                    </Link>

                    {
                        user && <>
                            <Link to={"/ani-list"}>
                                <Button
                                    label="Listes d'animes"
                                    className={selectedColor("/ani-list")}
                                />
                            </Link>

                            <Link to={"/contact"}>
                                <Button
                                    label="Contact"
                                    className={selectedColor("/contact")}
                                />
                            </Link>

                            <Link to={"/profile"}>
                                <Button
                                    label="Profil"
                                    className={selectedColor("/profile")}
                                />
                            </Link>
                        </>
                    }

                    {
                        user ? <Button
                                label="Se déconnecter"
                                className="flex lg:hidden p-2 font-semibold bg-light-red hover:bg-light-lightred dark:text-light dark:bg-dark-red dark:hover:bg-dark-lightred"
                                handleClick={logout}
                            />
                        : <>
                            <Link to={"/login"}>
                                <Button
                                    label="Se connecter"
                                    className="flex lg:hidden p-2 font-semibold bg-light-blue hover:bg-light-lightblue dark:text-light dark:bg-dark-blue dark:hover:bg-dark-lightblue"
                                />
                            </Link>

                            <Link to={"/register"}>
                                <Button
                                    label="S'inscrire"
                                    className="flex lg:hidden p-2 font-semibold bg-light-yellow hover:bg-light-lightyellow dark:text-light dark:bg-dark-yellow dark:hover:bg-dark-lightyellow"
                                />
                            </Link>
                        </>
                    }

                    <FaChevronLeft className="w-4 h-5 mr-2 cursor-pointer dark:text-white scale-80 lg:scale-100 rotate-90 lg:rotate-0" onClick={() => setExtended(false)} />
                </>
                : <FaChevronRight className="w-4 h-5 my-2 cursor-pointer dark:text-white scale-80 lg:scale-100 rotate-90 lg:rotate-0" onClick={() => setExtended(true)} />
            }
            
        </nav>
    </>
}