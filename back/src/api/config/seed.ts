import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { getEnvVariable } from "../utility";

export const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: getEnvVariable("DATABASE_URL")
    })
});

async function main() {
    console.log("Ajout des utilisateurs...");
    await prisma.user.create({
        data: {
            username: "test",
            email: "test@gmail.com",
            password: "test",
            createdAt: new Date()
        }
    })
}

main()
    .catch(e => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    })