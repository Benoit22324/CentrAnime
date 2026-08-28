type ButtonProps = {
    label: string
    handleClick?: () => void
    className?: string
}

export const Button = ({ label, handleClick, className }: ButtonProps) => {
    return <button
        className={`${className ?? "p-2 font-semibold bg-light-blue hover:bg-light-lightblue"} rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95`}
        onClick={handleClick}
    >
        {label}
    </button>
}