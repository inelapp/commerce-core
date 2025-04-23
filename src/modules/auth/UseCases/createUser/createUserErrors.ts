import { BadRequestException } from "@nestjs/common";

export class CreateUserBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}

export class CreateUserEmailAlreadyExistsError extends BadRequestException {
    constructor() {
        super("User email already exists");
    }
}

export class CreateUserUsernameAlreadyExistsError extends BadRequestException {
    constructor() {
        super("User username already exists");
    }
}