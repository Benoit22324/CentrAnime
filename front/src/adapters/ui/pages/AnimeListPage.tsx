import { FaPlus } from "react-icons/fa6";
import { useEffect, useState } from "react";
import GetAnimeListOffsetUseCase from "../../../domain/usecases/GetAnimeListOffsetUseCase";
import AnimeListRepository from "../../data/api/AnimeListRepository"
import AnimeList from "../../../domain/entities/AnimeList";
import { Pagination } from "../components/Pagination";
import { AnimeListItem } from "../components/AnimeListItem";
import DeleteAnimeListUseCase from "../../../domain/usecases/DeleteAnimeListUseCase";
import { Link } from "react-router-dom";

export const AnimeListPage = () => {
    const animeListRepository = new AnimeListRepository();
    const getAnimeListOffsetUseCase = new GetAnimeListOffsetUseCase(animeListRepository);
    const deleteAnimeListUseCase = new DeleteAnimeListUseCase(animeListRepository);

    const [ selectedPage, setSelectedPage ] = useState<number>(0);
    const [ totalPage, setTotalPage ] = useState<number>(0);
    const [ animeListData, setAnimeListData ] = useState<AnimeList[] | null>(null);

    const deleteAniList = async (anilistId: string) => {
        try {
            await deleteAnimeListUseCase.execute({ id: anilistId });

            await fetchAniList();
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchAniList = async () => {
        try {
            const response = await getAnimeListOffsetUseCase.execute({ selectedPage, maxItems: 3 });

            setAnimeListData(response.animeLists);
            setTotalPage(response.total);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    useEffect(() => {
        fetchAniList();
    }, [selectedPage])

    return <>
        <div className="flex justify-center items-end gap-2 mb-4">
            <h1 className="text-4xl font-semibold text-center dark:text-light">Vos listes d'animes</h1>
            <Link
                to={"/create-list"}
                className={`p-1.5 font-semibold bg-light-grey border border-dark hover:bg-light-lightgrey rounded-lg shadow-custom-1 shadow-black/20 hover:cursor-pointer hover:scale-95`}
            >
                <FaPlus size={20} />
            </Link>
        </div>

        <div className="flex justify-center gap-6 w-[90%] mx-auto my-4">
            {
                (animeListData && animeListData.length > 0) ? animeListData.map(al => <AnimeListItem
                    key={al.getId()}
                    animeList={al}
                    deleteList={deleteAniList}
                />)
                : <span className="text-lg md:text-xl font-semibold">Aucune liste d'animes trouvée.</span>
            }
        </div>

        <Pagination
            selectedPage={selectedPage}
            setSelectedPage={setSelectedPage}
            totalPage={animeListData ? totalPage : null}
        />
    </>
}