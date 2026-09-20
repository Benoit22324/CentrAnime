import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ChatOverlay } from "../components/ChatOverlay"
import { useAuth } from "../context/AuthContext"

export const GlobalLayout = () => {
    const { user } = useAuth();

    return <>
        <Header />

        <main className="w-[90%] md:w-[80%] mx-auto p-2">
            <Outlet />

            {
                user && <ChatOverlay />
            }
        </main>

        <Footer />
    </>
}