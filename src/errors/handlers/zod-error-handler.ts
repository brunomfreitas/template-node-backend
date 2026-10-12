import { ZodError } from 'zod';

import { ERROR_CODES } from '../constants/error-codes';

export const zodErrorHandler = (
    error: ZodError
) => {

    return {

        success: false,

        errors: error.issues.map((issue) => ({

            field: issue.path[0],

            code:
                issue.message.includes('string')
                    ? ERROR_CODES.REQUIRED_FIELD
                    : ERROR_CODES.INVALID_FIELD
        }))
    };
};