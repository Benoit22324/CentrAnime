type ButtonProps = {
    label: string
    handleClick?: () => void
    className?: string
    disable?: boolean
}

export const Button = ({ label, handleClick, className, disable }: ButtonProps) => {
    return <button
        className={`${className ?? "p-2 font-semibold bg-light-blue hover:bg-light-lightblue"} rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95 disabled:text-dark/70 disabled:bg-light-darkgrey/40 disabled:hover:scale-100`}
        onClick={handleClick}
        disabled={disable}
    >
        {label}
    </button>
}