import { ERROR_CODES } from '../constants/error-codes';

import { AppError } from '../types/app-error';

export const authErrorHandler =
() => {

    return new AppError(401, [
        {
            code:
                ERROR_CODES.INVALID_CREDENTIALS
        }
    ]);
};