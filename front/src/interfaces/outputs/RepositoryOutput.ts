export interface RepositoryOutput {
    success: boolean,
    data: any,
    error?: {
        message: string,
        code: number
    }
}