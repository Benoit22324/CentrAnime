import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "./Button";

export const Navbar = () => {
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

                    <Link to={"/"}>
                        <Button
                            label="Recommandation"
                            className={selectedColor("/recommandation")}
                        />
                    </Link>

                    <FaChevronLeft className="w-4 h-5 mr-2 cursor-pointer" onClick={() => setExtended(false)} />
                </>
                : <FaChevronRight className="w-4 h-5 my-2 cursor-pointer" onClick={() => setExtended(true)} />
            }
            
        </nav>
    </>
}