import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getEnvVariable } from ".";
import type { UserPayload } from "../dto";

export const generateSalt = async () => {
    return bcrypt.genSalt();
}

export const hashPassword = async (password: string, salt: string) => {
    return bcrypt.hash(password, salt);
}

export const isValidPassword = async (enteredPassword: string, savedPassword: string, salt: string) => {
    return await hashPassword(enteredPassword, salt) === savedPassword;
}

export const generateSignature = (payload: UserPayload) => {
    const SECRET_KEY = getEnvVariable("JWT_SECRET");

    return jwt.sign(payload, SECRET_KEY, {
        expiresIn: "1d"
    });
}