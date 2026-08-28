import type Genre from "../../../domain/entities/Genre"

type FilterGenreItemProps = {
    genre: Genre,
    isChecked: boolean,
    selectGenre: () => void
}

export const FilterGenreItem = ({ genre, isChecked, selectGenre }: FilterGenreItemProps) => {
    return <>
        <div className="group flex items-center gap-2 w-1/5 my-0.5 cursor-default select-none" onClick={selectGenre}>
            <span className={`p-2 border-2 rounded-lg ${isChecked ? "bg-light-lightblue" : "bg-light-lightgrey group-hover:bg-light-darkgrey"}`}></span>
            <span className="text-lg font-semibold">{genre.getName()}</span>
        </div>
    </>
}