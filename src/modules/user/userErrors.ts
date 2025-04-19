import { BadRequestException } from '@nestjs/common';

export class CreateUserBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}
