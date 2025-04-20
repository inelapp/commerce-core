import { BadRequestException } from "@nestjs/common";

export class GetCategoriesBadRequestError extends BadRequestException {
    constructor(message: string) {
        super(message);
    }
}