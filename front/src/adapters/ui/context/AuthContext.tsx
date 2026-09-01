import React, { createContext, useContext, useEffect, useState, type PropsWithChildren } from "react";
import type { AuthContextType } from "../../../typings/AuthContextType";
import type User from "../../../domain/entities/User";
import type { RegisterFormData } from "../../../typings/RegisterFormData";
import AuthRepository from "../../data/api/AuthRepository";
import LoginUseCase from "../../../domain/usecases/LoginUseCase";
import RegisterUseCase from "../../../domain/usecases/RegisterUseCase";
import type { LoginFormData } from "../../../typings/LoginFormData";
import LogoutUseCase from "../../../domain/usecases/LogoutUseCase";
import GetUserUseCase from "../../../domain/usecases/GetUserUseCase";
import UpdateUserUseCase from "../../../domain/usecases/UpdateUserUseCase";
import UserRepository from "../../data/api/UserRepository";
import DeleteUserUseCase from "../../../domain/usecases/DeleteUserUseCase";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const userRepository = new UserRepository();
    const updateUserUseCase = new UpdateUserUseCase(userRepository);
    const deleteUserUseCase = new DeleteUserUseCase(userRepository);

    const authRepository = new AuthRepository();
    const loginUseCase = new LoginUseCase(authRepository);
    const registerUseCase = new RegisterUseCase(authRepository);
    const logoutUseCase = new LogoutUseCase(authRepository);
    const getUserUseCase = new GetUserUseCase(authRepository);

    const [user, setUser] = useState<User | null>(null);

    const login = async (payload: LoginFormData) => {
        try {
            const res = await loginUseCase.execute(payload);

            if (typeof res === "string") return res;
            if (res) setUser(res);
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }

    const register = async (payload: RegisterFormData) => {
        try {
            const res = await registerUseCase.execute(payload);

            if (res) return res;
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }

    const logout = async () => {
        try {
            await logoutUseCase.execute();

            setUser(null);
        } catch(err) {
            throw new Error("Une erreur est survenue");
        }
    }

    const me = async () => {
        try {
            const user = await getUserUseCase.execute();

            setUser(user);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }

    const updateUser = async (username: string) => {
        try {
            const user = await updateUserUseCase.execute({ username });

            setUser(user);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }

    const deleteAccount = async () => {
        try {
            await deleteUserUseCase.execute();

            setUser(null);
        } catch (err) {
            throw new Error("Une erreur est survenue");
        }
    }

    useEffect(() => {
        me();
    }, [])

    const authContextValue: AuthContextType = {
        user,
        login,
        register,
        logout,
        updateUser,
        deleteAccount
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