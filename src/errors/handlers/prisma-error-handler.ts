import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

import { ERROR_CODES } from '../constants/error-codes';

import { AppError } from '../types/app-error';

export const prismaErrorHandler = (
    error: PrismaClientKnownRequestError
) => {

    switch (error.code) {

        case 'P2002':

            return new AppError(409, [
                {
                    code:
                        ERROR_CODES.DUPLICATE_RECORD
                }
            ]);

        case 'P2025':

            return new AppError(404, [
                {
                    code:
                        ERROR_CODES.RECORD_NOT_FOUND
                }
            ]);

        default:

            return new AppError(500, [
                {
                    code:
                        ERROR_CODES.INTERNAL_SERVER_ERROR
                }
            ]);
    }
};
