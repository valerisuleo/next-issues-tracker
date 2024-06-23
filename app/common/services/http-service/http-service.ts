/* eslint-disable @typescript-eslint/no-explicit-any */
import { handleError } from './utils';
import { ISSR } from './interfaces';
import { setHeaders } from './utils';

export class HttpService {
    constructor(private url: string) {}

    public get(params?: Record<string, any>): Promise<any> {
        const url = new URL(this.url, window.location.origin);

        if (params) {
            Object.keys(params).forEach((key) => {
                if (params[key] !== undefined && params[key] !== null) {
                    url.searchParams.append(key, params[key]);
                }
            });
        }

        return handleError(
            fetch(url.toString(), {
                method: 'GET',
            })
        );
    }

    public post(payload: any): Promise<any> {
        return handleError(
            fetch(this.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
        );
    }

    public put(resource: any, key: string): Promise<any> {
        return handleError(
            fetch(`${this.url}/${resource[key]}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(resource),
            })
        );
    }

    public delete(resource: any, key: string): Promise<any> {
        return handleError(
            fetch(`${this.url}/${resource[key]}`, {
                method: 'DELETE',
            })
        );
    }

    //__________________________SSR__________________________
    public getCollectionSSR(data?: ISSR): Promise<any> {
        const headers: HeadersInit = setHeaders(data);

        return handleError(
            fetch(`${process.env.BASE_URL}/${this.url}`, {
                method: 'GET',
                headers: headers,
            })
        );
    }

    public getItemSSR(id: string, data?: ISSR): Promise<any> {
        const headers: HeadersInit = setHeaders(data);

        return handleError(
            fetch(`${process.env.BASE_URL}/${this.url}/${id}`, {
                method: 'GET',
                headers: headers,
            })
        );
    }
}
