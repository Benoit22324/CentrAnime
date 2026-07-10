import type { Request, Response, NextFunction } from 'express';

export const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const formattedError = {
        message: err.message || "Une erreur est survenue",
        code: err.statusCode || 500
    };

    res.jsonError(formattedError.message, formattedError.code);
}