/* eslint-disable @typescript-eslint/no-explicit-any */
import { ISSR } from './interfaces';

export function setHeaders(data: ISSR) {
    const headers: HeadersInit = {};

    if (data && data.params) {
        if (data.params.cache) {
            headers['Cache-Control'] = data.params.cache;
        }

        if (data.params.next && data.params.next.revalidate !== undefined) {
            headers['Next-Revalidate'] = data.params.next.revalidate.toString();
        }
    }
    return headers;
}

export async function handleError(promise: Promise<Response>): Promise<any> {
    try {
        const response = await promise;
        if (!response.ok) {
            const errorData = await response.json();
            const error = {
                success: false,
                status: response.status,
                statusText: response.statusText,
                error: errorData,
            };
            return Promise.reject(error);
        }
        return response.json();
    } catch (error) {
        console.log(error);
    }
}
