import { User } from "@prisma/client";
import { prisma } from "../../api/config/client";
import { UserRepositoryInterface } from "../../domain/interfaces/UserRepositoryInterface";
import { generateSalt, hashPassword } from "../../api/utility";

class UserRepository implements UserRepositoryInterface {
    async login(email: string): Promise<User> {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        if (!user) throw new Error("Identifiant invalide");

        return user;
    }

    async register(username: string, email: string, password: string): Promise<void> {
        const salt = await generateSalt();
        const hashedPassword = await hashPassword(password, salt);

        await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
                salt,
                createdAt: new Date()
            }
        })
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: {email}
        });

        return user
    }

    async getUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { id }
        });

        return user;
    }
}

export default UserRepository;