import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./Button";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
    const { user } = useAuth();
    const { pathname } = useLocation();
    const [ extended, setExtended ] = useState<boolean>(true);

    const selectedColor = (path: string) => {
        if (pathname === path) return "p-2 bg-light-lightblue";
        return "p-2 bg-light-grey hover:bg-light-lightgrey dark:bg-dark-grey dark:hover:bg-light-grey";
    }

    return <>
        <nav className="flex items-center gap-4 p-3 bg-black/20 rounded-r-lg dark:bg-white/20">
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

                    <FaChevronLeft className="w-4 h-5 mr-2 cursor-pointer" onClick={() => setExtended(false)} />
                </>
                : <FaChevronRight className="w-4 h-5 my-2 cursor-pointer" onClick={() => setExtended(true)} />
            }
            
        </nav>
    </>
}