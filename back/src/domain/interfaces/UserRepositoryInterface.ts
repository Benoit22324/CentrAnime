import { User } from "@prisma/client"

export interface UserRepositoryInterface {
    login(email: string): Promise<User>
    register(username: string, email: string, password: string): Promise<void>
    findByEmail(email: string): Promise<User | null>
    getUserById(id: string): Promise<User | null>
    updateUser(id: string, username: string): Promise<User | null>
    deleteUser(id: string): Promise<void>
}