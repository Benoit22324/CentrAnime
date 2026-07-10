import { User } from "@prisma/client";

export const sanitizeUser = (user: User) => {
    const { salt, password, ...safeInfo } = user;

    return safeInfo;
}