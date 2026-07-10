export const getEnvVariable = (varName: string) => {
    const value = process.env[varName];

    if (!value) throw new Error(`Environment Variable not found: ${varName}`);

    return value;
}

export const extractToken = (cookies: string): string | null => {
    const token = cookies["jwt"];

    return token ?? null
}