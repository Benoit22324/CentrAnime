import { Navigate, Route, Routes } from "react-router-dom"
import { GlobalLayout } from "../layouts/GlobalLayout"
import { useAuth } from "../context/AuthContext"
import { CatalogPage } from "../pages/CatalogPage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { AnimePage } from "../pages/AnimePage";

export const MainRoutes = () => {
    const { user } = useAuth();

    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<CatalogPage />} />
                <Route path="/anime/:id" element={<AnimePage />} />
                {
                    user ? <>
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