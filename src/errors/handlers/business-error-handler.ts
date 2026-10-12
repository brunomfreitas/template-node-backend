import { BusinessError } from '../types/business-error';

export const businessErrorHandler = (
    message: string,
    field?: string
) => {

    return new BusinessError([
        {
            field,
            code:
                'BUSINESS_RULE_ERROR',
            message
        }
    ]);
};