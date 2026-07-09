import React, { createContext, useContext, type PropsWithChildren } from "react";
import type { AuthContextType } from "../../../typings/AuthContextType";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    // const [user, setUser] = useState<any>(null);

    const authContextValue: AuthContextType = {
        // user
    }

    return <AuthContext.Provider value={authContextValue}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error("Error during the initialisation of AuthContext");

    return context;
}