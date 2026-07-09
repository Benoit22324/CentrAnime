import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { getEnvVariable } from "../utility";

export const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: getEnvVariable("DATABASE_URL")
    })
});