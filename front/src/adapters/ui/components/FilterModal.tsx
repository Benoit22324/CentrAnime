import type Genre from "../../../domain/entities/Genre"
import { FilterGenreItem } from "./FilterGenreItem"

type FilterModalProps = {
    genreList: Genre[] | null,
    selectedGenre: string,
    setSelectedGenre: (value: string) => void
}

export const FilterModal = ({ genreList, selectedGenre, setSelectedGenre }: FilterModalProps) => {
    return <>
        <div className="absolute filter_modal flex flex-wrap md:w-[95%] lg:w-[850px] px-6 py-4 bg-light-grey border border-dark rounded-xl z-10 dark:bg-dark-grey dark:border-light">
            {
                genreList ? genreList.map(g => <FilterGenreItem
                    key={g.getId()}
                    genre={g}
                    isChecked={selectedGenre === g.getName()}
                    selectGenre={() => selectedGenre === g.getName() ? setSelectedGenre("") : setSelectedGenre(g.getName())}
                />)
                : <span className="text-sm md:text-base font-semibold dark:text-light">Aucun genre disponible pour le moment.</span>
            }
        </div>
    </>
}