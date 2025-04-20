import { BadRequestException } from "@nestjs/common";

export class CreateCategoryBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}

export class CreateCategoryAlreadyExistsError extends BadRequestException {
    constructor() {
        super("The merchant already has a category with the same name");
    }
}