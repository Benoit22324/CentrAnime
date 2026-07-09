import { Navigate, Route, Routes } from "react-router-dom"
import { GlobalLayout } from "../layouts/GlobalLayout"
// import { useAuth } from "../context/AuthContext"
import { CatalogPage } from "../pages/CatalogPage";

export const MainRoutes = () => {
    // const { user } = useAuth();

    return <>
        <Routes>
            <Route element={<GlobalLayout />}>
                <Route path="/" element={<CatalogPage />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
}