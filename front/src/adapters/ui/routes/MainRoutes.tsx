import { Navigate, Route, Routes } from "react-router-dom"
import { GlobalLayout } from "../layouts/GlobalLayout"
import { useAuth } from "../context/AuthContext"
import { CatalogPage } from "../pages/CatalogPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AnimePage } from "../pages/AnimePage";
import { AnimeListPage } from "../pages/AnimeListPage";
import { ListCreationPage } from "../pages/ListCreationPage";
import { RecommandationPage } from "../pages/RecommandationPage";
import { ListEditPage } from "../pages/ListEditPage";
import { ProfilePage } from "../pages/ProfilePage";

export const MainRoutes = () => {
    const { user } = useAuth();

    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/anime/:id" element={<AnimePage />} />
                <Route path="/reco" element={<RecommandationPage />} />
                {
                    user ? <>
                        <Route path="/ani-list" element={<AnimeListPage />} />
                        <Route path="/create-list" element={<ListCreationPage />} />
                        <Route path="/edit-list/:id" element={<ListEditPage />} />
                        <Route path="/profile" element={<ProfilePage />} />
                    </>
                    : <>
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                    </>
                }
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
}