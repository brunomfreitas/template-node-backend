import { AppError } from "./app-error";

export class ValidationError
    extends AppError {

    constructor(errors: any) {

        super(400, errors);
    }
}