import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../prisma/client';
import { getItemById, handleUpdate } from '../../lib/handlers/crudHandlers';
import issueSchema from '../../../validation-schemas/issue/schema';
import {
    badRequest,
    notFound,
} from '../../lib/handlers/errors/customResponses';
import { errorHandler } from '../../lib/handlers/errors/errorHandler';

const { issue: issueModel } = prisma;

async function showRoute(req: NextRequest, { params }) {
    const { id } = params;
    const existingIssue = await getItemById(issueModel, id);

    if (!existingIssue) {
        return notFound();
    } else {
        return NextResponse.json(existingIssue);
    }
}

async function updateRoute(req: NextRequest, { params }) {
    const { id } = params;
    const existingUser = await getItemById(issueModel, id);

    if (!existingUser) {
        return notFound();
    }

    const body = await req.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        return badRequest(validation.error.format());
    } else {
        return handleUpdate(issueModel, body, existingUser.id);
    }
}

async function deleteRoute(req: NextRequest, { params }) {
    const { id } = params;
    const existingUser = await getItemById(issueModel, id);

    if (!existingUser) {
        return notFound();
    } else {
        try {
            await issueModel.delete({
                where: { id: existingUser.id },
            });

            return NextResponse.json(
                { message: 'User deleted successfully' },
                { status: 200 }
            );
        } catch (error) {
            return errorHandler();
        }
    }
}

export { showRoute as GET, updateRoute as PUT, deleteRoute as DELETE };
