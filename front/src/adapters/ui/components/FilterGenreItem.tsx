import type Genre from "../../../domain/entities/Genre"

type FilterGenreItemProps = {
    genre: Genre,
    isChecked: boolean,
    selectGenre: () => void
}

export const FilterGenreItem = ({ genre, isChecked, selectGenre }: FilterGenreItemProps) => {
    return <>
        <div className="group flex items-center gap-2 w-1/2 md:w-1/4 lg:w-1/5 my-0.5 cursor-default select-none" onClick={selectGenre}>
            <span className={`p-2 border-2 border-dark rounded-lg dark:border-light ${isChecked ? "bg-light-lightblue dark:bg-dark-lightblue" : "bg-light-lightgrey group-hover:bg-light-darkergrey dark:bg-dark-darkgrey dark:group-hover:bg-dark-lightgrey"}`}></span>
            <span className="text-base lg:text-lg font-semibold dark:text-light">{genre.getName()}</span>
        </div>
    </>
}