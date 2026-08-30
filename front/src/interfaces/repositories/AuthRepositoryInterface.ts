import type { LoginFormData } from "../../typings/LoginFormData";
import type { RegisterFormData } from "../../typings/RegisterFormData";
import type { RepositoryOutput } from "../outputs/RepositoryOutput";

export interface AuthRepositoryInterface {
    login(payload: LoginFormData): Promise<RepositoryOutput>
    register(payload: RegisterFormData): Promise<RepositoryOutput | void>
    logout(): Promise<void>
    me(): Promise<RepositoryOutput>
}