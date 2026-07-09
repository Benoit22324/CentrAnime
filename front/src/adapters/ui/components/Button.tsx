type ButtonProps = {
    label: string
    handleClick?: () => void
    className?: string
}

export const Button = ({ label, handleClick, className }: ButtonProps) => {
    return <button
        className={`${className ?? "p-2 font-semibold bg-light-blue hover:bg-light-lightblue"} rounded-lg shadow-md shadow-black/25 hover:cursor-pointer`}
        onClick={handleClick}
    >
        {label}
    </button>
}