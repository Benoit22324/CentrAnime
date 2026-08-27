import type { Request, Response, NextFunction } from 'express';
import { isRedisWorking, readFromRedis, requestToKey, writeToRedis } from '../utility';

interface RedisOptions {
    EX: number, // Expiration en secondes
}

export const redisCachingMiddleware = (options: RedisOptions = { EX: 21600 }) =>
    async (req: Request, res: Response, next: NextFunction): Promise<any> => {
        console.log("redisMiddleware déclenché pour: ", req.method, req.originalUrl);

        if (!isRedisWorking()) return next();

        const key = requestToKey(req);
        const cachedValue = await readFromRedis(key);

        if (cachedValue !== null) {
            console.log("Réponse issue du cache pour ", key);

            try {
                return res.jsonSuccess(JSON.parse(cachedValue));
            } catch (error) {
                return res.jsonSuccess(cachedValue);
            }
        }

        const originalJsonSuccess = res.jsonSuccess.bind(res);

        console.log("Middleware Redis exécuté pour: ", req.path);

        res.jsonSuccess = function(data: any, statusCode: number = 200): Response {
            if (statusCode >= 200 && statusCode < 300) {
                const payload = typeof data === "string" ? data : JSON.stringify(data);

                console.log("Mise en cache déclenché pour ", key);

                writeToRedis(key, payload, options).catch(err => console.log("Erreur de cache Redis: ", err));
            }

            res.jsonSuccess = originalJsonSuccess;

            return originalJsonSuccess(data, statusCode);
        }

        return next();
    }
