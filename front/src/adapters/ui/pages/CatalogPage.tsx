import { IoSearchSharp } from "react-icons/io5";
import { useEffect, useState } from "react";
import GetAnimeOffsetUseCase from "../../../domain/usecases/GetAnimeOffsetUseCase";
import AnimeRepository from "../../data/api/AnimeRepository"
import Anime from "../../../domain/entities/Anime";
import { Pagination } from "../components/Pagination";
import { CatalogueAnimeItem } from "../components/CatalogueAnimeItem";
import { Button } from "../components/Button";
import GenreRepository from "../../data/api/GenreRepository";
import GetGenresUseCase from "../../../domain/usecases/GetGenresUseCase";
import Genre from "../../../domain/entities/Genre";
import { FilterModal } from "../components/FilterModal";

export const CatalogPage = () => {
    const genreRepository = new GenreRepository();
    const getGenresUseCase = new GetGenresUseCase(genreRepository);

    const animeRepository = new AnimeRepository();
    const getAnimeOffsetUseCase = new GetAnimeOffsetUseCase(animeRepository);

    const [ isFilterOpen, setIsFilterOpen ] = useState<boolean>(false);
    const [ selectedPage, setSelectedPage ] = useState<number>(0);
    const [ totalPage, setTotalPage ] = useState<number>(1);
    const [ animeList, setAnimeList ] = useState<Anime[]>([]);
    const [ genreList, setGenreList ] = useState<Genre[] | null>(null);
    const [ searchState, setSearchState ] = useState<boolean>(false);
    const [ searchName, setSearchName ] = useState<string>("");
    const [ selectedGenre, setSelectedGenre ] = useState<string>("");

    const fetchGenres = async () => {
        try {
            const response = await getGenresUseCase.execute();

            setGenreList(response);
        } catch (err) {
            throw new Error("Une erreur innatendue est survenue");
        }
    }

    const fetchAnimes = async () => {
        try {
            const response = await getAnimeOffsetUseCase.execute({ selectedPage, maxItems: 10, searchName: searchName.trim(), filterGenre: selectedGenre });

            setAnimeList(response.animes);
            if (response.total > totalPage) setTotalPage(response.total);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const handleSearchAnime = async () => {
        try {
            const response = await getAnimeOffsetUseCase.execute({ selectedPage: 0, maxItems: 10, searchName: searchName.trim(), filterGenre: selectedGenre });

            setIsFilterOpen(false);
            setSelectedPage(0);
            setAnimeList(response.animes);
            setTotalPage(response.total);

            if (searchName.trim() === "" || selectedGenre.trim() === "") setSearchState(false);
            else setSearchState(true);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    useEffect(() => {
        fetchGenres();
    }, [])

    useEffect(() => {
        fetchAnimes();
    }, [selectedPage])

    return <>
        <h1 className="mb-4 text-xl md:text-3xl lg:text-4xl font-semibold text-center dark:text-light">Catalogue d’animes</h1>
        <div className="relative flex justify-center gap-2 md:gap-4">
            {
                isFilterOpen && <FilterModal
                    genreList={genreList}
                    selectedGenre={selectedGenre}
                    setSelectedGenre={setSelectedGenre}
                />
            }
            <div className="flex flex-col-reverse md:flex-row justify-center gap-2 md:gap-4 w-full md:w-[50%]">
                <Button
                    label="Filtrer"
                    className={`filter_anchor w-fit px-2 lg:px-3 py-0.5 lg:py-1 font-semibold text-base lg:text-xl border border-dark dark:border-light dark:text-light ${isFilterOpen ? "bg-light-lightblue dark:bg-dark-lightblue" : "bg-light-grey hover:bg-light-lightgrey dark:bg-dark-grey dark:hover:bg-dark-darkgrey"}`}
                    handleClick={() => setIsFilterOpen(!isFilterOpen)}
                />
                <input
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    className="w-full px-4 py-2 bg-light-lightgrey text-base lg:text-lg rounded-lg border border-dark shadow-custom-1 shadow-black/20 dark:bg-dark-grey dark:text-light dark:border-light dark:shadow-light-grey/20 dark:placeholder:text-light/70"
                    placeholder="Ex : Frieren, Witch Hat Atelier, etc..."
                />
            </div>
            <button
                className={`h-fit p-1 md:p-2 font-semibold bg-light-grey border border-dark hover:bg-light-lightgrey rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95 dark:bg-dark-grey dark:hover:bg-dark-darkgrey dark:border-light dark:shadow-light-grey/20`}
                onClick={handleSearchAnime}
            >
                <IoSearchSharp size={30} className="dark:text-light scale-80 lg:scale-100" />
            </button>
        </div>
        <div className="w-full xl:w-[1180px] mx-auto my-4 flex justify-center gap-6 flex-wrap">
            {
                animeList.length > 0 ? animeList.map(anime => <CatalogueAnimeItem key={anime.getId()} anime={anime} />)
                : <span className="text-lg md:text-xl font-semibold dark:text-light">Aucun anime trouvé.</span>
            }
        </div>
        <div className="flex justify-center items-center gap-4">
            <Pagination
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                totalPage={searchState ? totalPage : null}
            />
        </div>
    </>
}