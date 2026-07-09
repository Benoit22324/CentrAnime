import { AuthProvider } from "./adapters/ui/context/AuthContext";
import { MainRoutes } from "./adapters/ui/routes/MainRoutes";

export default function App() {
  return (
    <>
      <AuthProvider>
        <MainRoutes />
      </AuthProvider>
    </>
  )
}
