import type User from "../domain/entities/User"
import type { LoginFormData } from "./LoginFormData"
import type { RegisterFormData } from "./RegisterFormData"

export type AuthContextType = {
    user: User | null,
    login: (payload: LoginFormData) => Promise<string | void>
    register: (payload: RegisterFormData) => Promise<string | void>
    logout: () => Promise<void>
    updateUser: (username: string) => Promise<void>
    deleteAccount: () => Promise<void>
}