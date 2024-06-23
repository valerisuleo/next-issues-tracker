/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ISSR {
    params?: ICacheStrategy;
}

interface ICacheStrategy {
    cache?: 'no-store';
    next?: { revalidate: number };
}

export interface IError {
    success: boolean;
    status: number | string;
    statusText: string;
    error: any;
}
