import { createClient, RedisClientType } from "redis";
import { getEnvVariable } from "../utility";

let redisClient: RedisClientType | null = null;

export async function initialiseRedisClient(): Promise<void> {
    const redisUri = getEnvVariable("REDIS_URI");

    redisClient = createClient({ url: redisUri });

    redisClient.on("error", (err) => console.log("Erreur redis: ", err));

    try {
        await redisClient.connect();

        console.log("✅ Client Redis connecté");
    } catch (error) {
        console.log("Erreur lors de la connexion Redis: ", error);
    }
}

export function getRedisClient(): RedisClientType {
    if (!redisClient || !redisClient.isOpen) throw new Error("Le client redis n'est pas encore initialisé et connecté");

    return redisClient;
}