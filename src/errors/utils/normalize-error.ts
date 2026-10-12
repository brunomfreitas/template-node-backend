import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ZodError } from 'zod';
// import { zodErrorHandler } from '../handlers/zod-error-handler';
import { ERROR_CODES } from '../constants/error-codes';
import { prismaErrorHandler } from '../handlers/prisma-error-handler';
import { AppError } from '../types/app-error';
import { zodErrorHandler } from '../types/zod-error-handler';

export const normalizeError = (
    error: unknown
): AppError => {

    // ZOD
    if (error instanceof ZodError) {

        return zodErrorHandler(error);
    }

    // PRISMA
    if (
        error instanceof
        PrismaClientKnownRequestError
    ) {

        return prismaErrorHandler(error);
    }

    // APP ERROR
    if (error instanceof AppError) {

        return error;
    }

    console.error(error);

    return new AppError(500, [
        {
            code:
                ERROR_CODES.INTERNAL_SERVER_ERROR
        }
    ]);
};
