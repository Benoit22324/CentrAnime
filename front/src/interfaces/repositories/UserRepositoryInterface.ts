import type { RepositoryOutput } from "../outputs/RepositoryOutput"

export interface UserRepositoryInterface {
    updateUser(username: string): Promise<RepositoryOutput>
    deleteUser(): Promise<void>
}