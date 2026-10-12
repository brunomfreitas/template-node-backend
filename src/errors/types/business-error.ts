import { AppError } from './app-error';

export class BusinessError
    extends AppError {

    constructor(errors: any) {

        super(422, errors);
    }
}