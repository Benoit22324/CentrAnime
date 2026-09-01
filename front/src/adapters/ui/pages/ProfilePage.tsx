import { useAuth } from "../context/AuthContext"
import { convertDateToText } from "../../../utils/convertDateToText";
import OpinionRepository from "../../data/api/OpinionRepository";
import GetViewOpinionUseCase from "../../../domain/usecases/GetViewOpinionUseCase";
import { useEffect, useState } from "react";
import Opinion from "../../../domain/entities/Opinion";
import { Button } from "../components/Button";
import { ProfileViewStatusItem } from "../components/ProfileViewStatusItem";
import RecommandationRepository from "../../data/api/RecommandationRepository";
import GetFavoriteRecommandationsUseCase from "../../../domain/usecases/GetFavoriteRecommandationsUseCase";
import type Recommandation from "../../../domain/entities/Recommandation";
import { ProfileFavoriteRecoItem } from "../components/ProfileFavoriteRecoItem";
import { DeleteConfirmationModal } from "../components/DeleteConfirmationModal";
import { ProfileEditModal } from "../components/ProfileEditModal";

export const ProfilePage = () => {
    const { user, deleteAccount } = useAuth();

    const opinionRepository = new OpinionRepository();
    const getViewOpinionUseCase = new GetViewOpinionUseCase(opinionRepository);

    const recommandationRepository = new RecommandationRepository();
    const getFavoriteRecommandationsUseCase = new GetFavoriteRecommandationsUseCase(recommandationRepository);

    const [ viewOpinions, setViewOpinions ] = useState<Opinion[]>([]);
    const [ favoriteRecos, setFavoriteRecos ] = useState<Recommandation[]>([]);
    const [ isEditOpen, setIsEditOpen ] = useState<boolean>(false);
    const [ isDeleteOpen, setIsDeleteOpen ] = useState<boolean>(false);

    const fetchViewOpinions = async () => {
        try {
            const response = await getViewOpinionUseCase.execute();

            setViewOpinions(response ?? []);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    const fetchFavorites = async () => {
        try {
            const response = await getFavoriteRecommandationsUseCase.execute();

            setFavoriteRecos(response ?? []);
        } catch (error) {
            throw new Error("Une erreur inattendue est survenue");
        }
    }

    useEffect(() => {
        fetchViewOpinions();
        fetchFavorites();
    }, [user])

    return <>
        {
            isDeleteOpen && <DeleteConfirmationModal
                onConfirm={() => {
                    deleteAccount();
                    setIsDeleteOpen(false);
                }}
                onCancel={() => setIsDeleteOpen(false)}
            />
        }
        {
            isEditOpen && <ProfileEditModal
                onClose={() => setIsEditOpen(false)}
            />
        }
        <div className="flex justify-between items-center h-[80dvh]">
            <div className="flex flex-col items-center gap-2 w-[30%] h-[90%]">
                <h2 className="text-2xl md:text-3xl font-semibold text-center">Vos recommandations favoris</h2>

                <div className="flex flex-col gap-2 w-full max-h-[90%] px-2 py-4 overflow-y-auto scrollbar-none">
                    {
                        favoriteRecos.length > 0 ? favoriteRecos.map(favReco => <ProfileFavoriteRecoItem key={favReco.getId()} reco={favReco} />)
                        : <span className="text-base md:text-lg text-center">Aucune recommandation favorite</span>
                    }
                </div>
            </div>
            <div className="flex flex-col items-center gap-4 w-[30%]">
                <h1 className="text-2xl md:text-3xl font-semibold text-center">Vos informations</h1>

                <div className="flex flex-col items-center gap-1 py-3 px-5 bg-light-grey rounded-xl">
                    <p className="text-base md:text-lg">Pseudonyme : <span className="font-semibold">{user?.getUsername() ?? "?"}</span></p>
                    <p className="text-base md:text-lg">E-mail : {user?.getEmail() ?? "?"}</p>
                    <p className="text-base md:text-lg">Compte crée le <span className="font-semibold">{user ? convertDateToText(new Date(user.getCreatedAt())) : "?"}</span></p>
                </div>

                <div className="flex justify-center gap-4">
                    <Button
                        label="Modifier"
                        className="px-4 py-2 font-semibold bg-light-blue hover:bg-light-lightblue"
                        handleClick={() => setIsEditOpen(true)}
                    />
                    <Button
                        label="Supprimer"
                        className="px-4 py-2 font-semibold bg-light-red hover:bg-light-lightred"
                        handleClick={() => setIsDeleteOpen(true)}
                    />
                </div>
            </div>
            <div className="flex flex-col items-center gap-2 w-[30%] h-[90%]">
                <h2 className="text-2xl md:text-3xl font-semibold text-center">Vos statut de visionnage</h2>

                <div className="flex flex-col gap-2 w-full max-h-[90%] px-2 py-4 overflow-y-auto scrollbar-none">
                    {
                        viewOpinions.length > 0 ? viewOpinions.map(vo => <ProfileViewStatusItem key={vo.getId()} opinion={vo} />)
                        : <span className="text-base md:text-lg text-center">Aucun statut de visionnage</span>
                    }
                </div>
            </div>
        </div>
    </>
}