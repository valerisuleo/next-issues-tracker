/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { ZodFormattedError } from 'zod';

// export function badRequest(errors: ZodIssue[]) {
//     return NextResponse.json({ errors }, { status: 400 });
// }

export function badRequest(errors: ZodFormattedError<any>) {
    return NextResponse.json({ errors }, { status: 400 });
}

export function notFound() {
    return NextResponse.json({ error: 'Not Found' }, { status: 404 });
}
