import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"

export const GlobalLayout = () => {
    return <>
        <Header />

        <main className="w-[80%] mx-auto p-2">
            <Outlet />
        </main>

        <Footer />
    </>
}