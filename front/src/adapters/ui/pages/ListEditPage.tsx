import { useParams } from "react-router-dom"
import { ListEditForm } from "../components/ListEditForm";
import AnimeListRepository from "../../data/api/AnimeListRepository";
import GetAnimeListByIdUseCase from "../../../domain/usecases/GetAnimeListByIdUseCase";
import RecommandationRepository from "../../data/api/RecommandationRepository";
import GetRecommandationByIdUseCase from "../../../domain/usecases/GetRecommandationByIdUseCase";
import { useEffect, useState } from "react";
import AnimeList from "../../../domain/entities/AnimeList";
import type Recommandation from "../../../domain/entities/Recommandation";

export const ListEditPage = () => {
    const { id } = useParams();

    const animeListRepository = new AnimeListRepository();
    const getAnimeListByIdUseCase = new GetAnimeListByIdUseCase(animeListRepository);

    const recommandationRepository = new RecommandationRepository();
    const getRecommandationByIdUseCase = new GetRecommandationByIdUseCase(recommandationRepository);

    const [ aniListData, setAniListData ] = useState<AnimeList | null>(null);
    const [ recoData, setRecoData ] = useState<Recommandation | null>(null);

    const updateLocalList = (type: string, list: AnimeList | Recommandation) => {
        if (type === "anilist") setAniListData(list as AnimeList);
        else if (type === "reco") setRecoData(list as Recommandation);
    }

    const fetchList = async () => {
        if (!id) return

        try {
            const anilist = await getAnimeListByIdUseCase.execute({ id });
            const reco = await getRecommandationByIdUseCase.execute({ id });

            setAniListData(anilist);
            setRecoData(reco);
        } catch (err) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    useEffect(() => {
        fetchList();
    }, [])

    return <>
        <div className="flex flex-col justify-center items-center gap-2 h-[80vh]">
            <h1 className="text-2xl font-semibold dark:text-light">Modifier une liste</h1>
            <p className="text-sm md:text-base">Les animes doivent être ajoutés directement sur leur page.</p>

            <ListEditForm
                aniList={aniListData}
                reco={recoData}
                updateState={updateLocalList}
            />
        </div>
    </>
}