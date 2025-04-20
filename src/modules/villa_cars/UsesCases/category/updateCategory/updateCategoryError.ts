import { BadRequestException, NotFoundException } from "@nestjs/common";

export class UpdateCategoryNotFoundError extends NotFoundException {
    constructor() {
        super("Category not found.");
    }
}

export class UpdateCategoryBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}