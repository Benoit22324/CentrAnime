import { User } from "@prisma/client";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";
import { generateSalt, hashPassword } from "../../api/utility";

class InMemoryUserRepository implements UserRepositoryInterface {
    async login(email: string): Promise<User> {
        if (email !== "user1@gmail.com") throw new Error("Identifiant invalide");

        const salt = await generateSalt();
        const hashedPassword = await hashPassword("abc", salt);

        const user: User = {
            id: "user1",
            username: "AnimeFan",
            email: "user1@gmail.com",
            password: hashedPassword,
            salt,
            createdAt: new Date("09-22-2026"),
            lastLogin: new Date("09-22-2026")
        }

        return user;
    }

    async register(username: string, email: string, password: string): Promise<void> {
        if (email === "user1@gmail.com") throw new Error("Une erreur est survenue");
    }

    async findByEmail(email: string): Promise<User | null> {
        if (email === "user1@gmail.com") {
            const salt = await generateSalt();
            const hashedPassword = await hashPassword("abc", salt);

            const user: User = {
                id: "user1",
                username: "AnimeFan",
                email: "user1@gmail.com",
                password: hashedPassword,
                salt,
                createdAt: new Date("09-22-2026"),
                lastLogin: new Date("09-22-2026")
            }

            return user;
        } else if (email === "user2@gmail.com") {
            const salt = await generateSalt();
            const hashedPassword = await hashPassword("abc", salt);

            const user: User = {
                id: "user2",
                username: "GoodAnime",
                email: "user2@gmail.com",
                password: hashedPassword,
                salt,
                createdAt: new Date("09-18-2026"),
                lastLogin: new Date("09-22-2026")
            }

            return user;
        } else if (email === "user3@gmail.com") {
            const salt = await generateSalt();
            const hashedPassword = await hashPassword("abc", salt);

            const user: User = {
                id: "user3",
                username: "U3Anime",
                email: "user3@gmail.com",
                password: hashedPassword,
                salt,
                createdAt: new Date("09-20-2026"),
                lastLogin: new Date("09-23-2026")
            }

            return user;
        }

        return null;
    }

    async getUserById(id: string): Promise<User | null> {
        if (id !== "user1") return null;

        const salt = await generateSalt();
        const hashedPassword = await hashPassword("abc", salt);

        const user: User = {
            id: "user1",
            username: "AnimeFan",
            email: "user1@gmail.com",
            password: hashedPassword,
            salt,
            createdAt: new Date("09-22-2026"),
            lastLogin: new Date("09-22-2026")
        }

        return user;
    }

    async updateUser(id: string, username: string): Promise<User | null> {
        if (id !== "user1") throw new Error("Identifiants invalide");

        const salt = await generateSalt();
        const hashedPassword = await hashPassword("abc", salt);

        const user: User = {
            id: "user1",
            username,
            email: "user1@gmail.com",
            password: hashedPassword,
            salt,
            createdAt: new Date("09-22-2026"),
            lastLogin: new Date("09-22-2026")
        }

        return user;
    }

    async deleteUser(id: string): Promise<void> {
        if (id !== "user1") throw new Error("Une erreur est survenue");
    }
}

export default InMemoryUserRepository;