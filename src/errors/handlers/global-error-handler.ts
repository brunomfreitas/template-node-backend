import { NextFunction } from 'express';

import { Request } from 'express';

import { Response } from 'express';

import { normalizeError } from '../utils/normalize-error';

export const globalErrorHandler = (
    error: unknown,
    req: Request,
    res: Response,
    next: NextFunction
) => {

    const normalizedError =
        normalizeError(error);

    return res
        .status(
            normalizedError.statusCode
        )
        .json({

            success: false,

            errors:
                normalizedError.errors
        });
};