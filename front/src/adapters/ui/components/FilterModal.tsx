import type Genre from "../../../domain/entities/Genre"
import { FilterGenreItem } from "./FilterGenreItem"

type FilterModalProps = {
    genreList: Genre[] | null,
    selectedGenre: string,
    setSelectedGenre: (value: string) => void
}

export const FilterModal = ({ genreList, selectedGenre, setSelectedGenre }: FilterModalProps) => {
    return <>
        <div className="absolute -bottom-45 flex flex-wrap w-2/3 px-6 py-4 bg-light-grey border border-dark rounded-xl z-10">
            {
                genreList ? genreList.map(g => <FilterGenreItem
                    key={g.getId()}
                    genre={g}
                    isChecked={selectedGenre === g.getName()}
                    selectGenre={() => selectedGenre === g.getName() ? setSelectedGenre("") : setSelectedGenre(g.getName())}
                />)
                : <span className="font-semibold">Aucun genre disponible pour le moment.</span>
            }
        </div>
    </>
}