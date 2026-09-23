import { Outlet } from "react-router-dom"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ChatOverlay } from "../components/ChatOverlay"
import { useAuth } from "../context/AuthContext"

export const GlobalLayout = () => {
    const { user } = useAuth();

    return <>
        <Header />

        <main className="flex-grow w-[95%] lg:w-[80%] mx-auto p-2">
            <Outlet />

            {
                user && <ChatOverlay />
            }
        </main>

        <Footer />
    </>
}