interface ResponseError extends Error {
    status?: number;
}

export const errorFactory = (message: string, code?: number) => {
    const error: ResponseError = new Error(message);
    error.status = code || 500;
    return error;
}