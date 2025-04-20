import { BadRequestException, NotFoundException } from "@nestjs/common";

export class GetCategoryBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}

export class GetCategoryNotFoundError extends NotFoundException {
    constructor() {
        super('Category not found.');
    }
}