import { NextRequest } from 'next/server';
import { badRequest } from '../lib/handlers/errors/customResponses';
import prisma from '../../../prisma/client';
import { handleCreate } from '../lib/handlers/crudHandlers';
import bcrypt from 'bcrypt';
import userSchema from '../users/schema';

async function registerRoute(request: NextRequest) {
    const { user: userModel } = prisma;

    const body = await request.json();
    const validation = userSchema.safeParse(body);

    if (!validation.success) {
        // const { errors } = validation.error;
        return badRequest(validation.error.format());
    } else {
        const clone = { ...body };
        clone.hashedPassword = await bcrypt.hash(body.hashedPassword, 10);

        return handleCreate(userModel, clone, { email: clone.email });
    }
}

export { registerRoute as POST };
