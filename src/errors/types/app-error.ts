import { ErrorCode } from '../constants/error-codes';

export interface AppErrorItem {

    field?: string;
    code: ErrorCode;
    message?: string;
}

export class AppError extends Error {

    public statusCode: number;

    public errors: AppErrorItem[];

    constructor(
        statusCode = 500,
        errors: AppErrorItem[]
    ) {

        super();

        this.statusCode = statusCode;

        this.errors = errors;
    }
}