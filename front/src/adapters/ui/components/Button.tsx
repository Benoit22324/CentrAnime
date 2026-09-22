type ButtonProps = {
    label: string
    handleClick?: () => void
    className?: string
    type?: "submit" | "button"
    disable?: boolean
}

export const Button = ({ label, handleClick, className, type = "submit", disable }: ButtonProps) => {
    return <button
        type={type}
        className={`${className ?? "p-2 font-semibold bg-light-blue hover:bg-light-lightblue dark:text-light dark:bg-dark-blue dark:hover:bg-dark-lightblue"} text-sm lg:text-base rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95 disabled:text-dark/70 disabled:bg-light-darkergrey/40 disabled:hover:scale-100 dark:shadow-light-grey/20`}
        onClick={handleClick}
        disabled={disable}
    >
        {label}
    </button>
}