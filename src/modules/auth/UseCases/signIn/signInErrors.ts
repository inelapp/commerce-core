import { BadRequestException } from "@nestjs/common";

export class SignInBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}

export class SignInEmailNotFoundError extends BadRequestException {
    constructor() {
        super("Email not found.");
    }
}

export class SignInInvalidPasswordError extends BadRequestException {
    constructor() {
        super("Invalid password.");
    }
}