import { User } from "@prisma/client"

export interface UserRepositoryInterface {
    login(email: string): Promise<User>
    register(username: string, email: string, password: string): Promise<void>
    findByEmail(email: string): Promise<User | null>
}