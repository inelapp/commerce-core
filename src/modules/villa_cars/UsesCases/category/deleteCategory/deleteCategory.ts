import { err, ok, Result } from "neverthrow";
import { DeleteCategoryResponseDto } from "./deleteCategoryResponseDto";
import { formatDate, UnexpectedError, UseCase, validateRequest } from "../../../../../utils";
import { DeleteCategoryBadRequestError, DeleteCategoryNotFoundError } from "./deleteCategoryErrors";
import { DeleteCategoryRequestDto } from "./deleteCategoryRequestDto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CategoryCoreService } from "../../../../../core";
import Joi from "joi";
import { isValidObjectId } from "mongoose";

type Response = Result<DeleteCategoryResponseDto, UnexpectedError | DeleteCategoryBadRequestError | DeleteCategoryNotFoundError>;

@Injectable()
export class DeleteCategory implements UseCase<DeleteCategoryRequestDto, Response> {
    constructor(
        @Inject(forwardRef(() => CategoryCoreService))
        private readonly categoryCoreService: CategoryCoreService,
    ){}

    validate(request: DeleteCategoryRequestDto) {
        try {
            const validationSchema = Joi.object<DeleteCategoryRequestDto>({
                id: Joi.string().required().custom((value, helpers) => {
                    if(!isValidObjectId(value)) {
                        return helpers.error('string.invalid');
                    }
                    return value;
                }).messages({
                    'string.empty': 'Category ID is required',
                    'string.invalid': 'Invalid Category ID',
                }),
                merchant: Joi.string().required(),
            })
            return validateRequest<DeleteCategoryRequestDto>(validationSchema, request, 'Joi');
        } catch (error) {
            
        }
    }
    
    async execute(request: DeleteCategoryRequestDto, service?: any): Promise<Response> {
        try {
            const requestValidation = this.validate(request);
            if (requestValidation.isErr()) {
                return err(new DeleteCategoryBadRequestError(requestValidation.error));
            }
            const { id, merchant } = requestValidation.value;
            const categoryById = await this.categoryCoreService.getCategory({ id, merchant });

            if(!categoryById) {
                return err(new DeleteCategoryNotFoundError());
            }
            await this.categoryCoreService.deleteCategory(id, merchant);

            return ok({
                message: 'Category deleted successfully',
                timestamp: formatDate(new Date())
            })
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }

}
