import { useEffect, useState } from "react"
import { LuMoon, LuSun } from "react-icons/lu";

export const ThemeToggler = () => {
    const [ darkMode, setDarkMode ] = useState<boolean>(false);

    useEffect(() => {
        const selectedTheme = darkMode ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', selectedTheme);
    }, [ darkMode ])

    return <>
        <button
            className="p-2 font-semibold bg-light-grey hover:bg-light-lightgrey rounded-lg shadow-md shadow-black/25 hover:cursor-pointer"
            onClick={() => setDarkMode(!darkMode)}
        >
            {
                darkMode ? <LuMoon className="w-5 h-5 dark:text-white" />
                : <LuSun className="w-5 h-5 dark:text-white" />
            }
        </button>
    </>
}