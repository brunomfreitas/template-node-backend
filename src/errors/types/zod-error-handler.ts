import { ZodError } from 'zod';
import { ERROR_CODES } from '../constants/error-codes';
import { ValidationError } from '../types/validation-error';

export const zodErrorHandler = (
    error: ZodError
) => {

    const errors = error.issues.map(
        (issue) => ({

            field:
                String(issue.path[0]),

            code:
                issue.message.includes('date')
                    ? ERROR_CODES.INVALID_DATE
                    : ERROR_CODES.REQUIRED_FIELD
        })
    );

    return new ValidationError(
        errors
    );
};