import { BadRequestException, NotFoundException } from "@nestjs/common";

export class DeleteCategoryBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}

export class DeleteCategoryNotFoundError extends NotFoundException {
    constructor() {
        super('Category not found.');
    }
}