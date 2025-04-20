import { err, ok, Result } from "neverthrow";
import { UpdateCategoryResponseDto } from "./updateCategoryResponseDto";
import { UnexpectedError, UseCase, validateRequest } from "../../../../../utils";
import { UpdateCategoryBadRequestError, UpdateCategoryNotFoundError } from "./updateCategoryError";
import { UpdateCategoryRequestDto } from "./updateCategoryRequestDto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CategoryCoreService, fileJoiSchema } from "../../../../../core";
import Joi from "joi";

type Response = Result<UpdateCategoryResponseDto, UnexpectedError | UpdateCategoryBadRequestError | UpdateCategoryNotFoundError>;

@Injectable()
export class UpdateCategory implements UseCase<UpdateCategoryRequestDto, Response> {
    constructor(
        @Inject((forwardRef(() => CategoryCoreService)))
        private readonly categoryCoreService: CategoryCoreService,
    ){}

    validate(request: UpdateCategoryRequestDto) {
        const validationSchema = Joi.object<UpdateCategoryRequestDto>({
            name: Joi.string().optional(),
            description: Joi.string().optional(),
            img: fileJoiSchema.optional(),
            status: Joi.string().valid('active', 'inactive').optional(),
            parents: Joi.array().items(Joi.string()).optional(),
            id: Joi.string().required(),
        })
        return validateRequest<UpdateCategoryRequestDto>(validationSchema, request, 'Joi');
    }

    async execute(request: UpdateCategoryRequestDto, service?: any): Promise<Response> {
        try {
            const requestValidation = this.validate(request);
            if (requestValidation.isErr()) {
                return err(new UpdateCategoryBadRequestError(requestValidation.error));
            }
            const { id, ...props } = requestValidation.value;

            const categoryById = await this.categoryCoreService.getCategory({ id });

            if(!categoryById) {
                return err(new UpdateCategoryNotFoundError());
            }

            const result = await this.categoryCoreService.updateCategory(categoryById.id, props);
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }

}