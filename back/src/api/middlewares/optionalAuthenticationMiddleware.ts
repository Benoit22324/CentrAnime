import type { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import { extractToken, getEnvVariable } from '../utility';
import { UserPayload } from '../dto/userDto';

declare module "express-serve-static-core" {
    interface Request {
        user?: UserPayload
    }
}

export const optionalAuthenticationMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const cookies = req.cookies;

        if (!cookies) return next();

        const token = extractToken(cookies);

        if (!token) return next();

        const payload = jwt.verify(token, getEnvVariable("JWT_SECRET")) as UserPayload;

        req.user = payload;

        next();
    } catch(error) {
        next(error);
    }
}