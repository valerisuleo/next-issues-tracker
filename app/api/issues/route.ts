import { NextRequest, NextResponse } from 'next/server';
import { handleCreate } from '../lib/handlers/crudHandlers';
import { badRequest } from '../lib/handlers/errors/customResponses';
import prisma from '../../../prisma/client';
import { errorHandler } from '../lib/handlers/errors/errorHandler';
import issueSchema from '../../validation-schemas/issue/schema';

const { issue: issueModel } = prisma;

async function indexRoute(request: NextRequest) {
    try {
        const issues = await issueModel.findMany();
        return NextResponse.json(issues);
    } catch (error) {
        return errorHandler();
    }
}

async function createRoute(request: NextRequest) {
    const body = await request.json();
    const validation = issueSchema.safeParse(body);

    if (!validation.success) {
        // const { errors } = validation.error;
        return badRequest(validation.error.format());
    }

    return handleCreate(issueModel, body);
}

export { indexRoute as GET, createRoute as POST };
