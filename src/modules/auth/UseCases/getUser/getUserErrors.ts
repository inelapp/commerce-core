import { BadRequestException, NotFoundException } from "@nestjs/common";

export class GetUserNotFoundError extends NotFoundException {
    constructor() {
        super('User not found.');
    }
}

export class GetUserBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}