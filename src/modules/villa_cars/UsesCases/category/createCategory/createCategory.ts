import { err, ok, Result } from "neverthrow";
import { CreateCategoryResponseDto } from "./createCategoryResponseDto";
import { UnexpectedError, UseCase, validateRequest } from "../../../../../utils";
import { CreateCategoryAlreadyExistsError, CreateCategoryBadRequestError } from "./createCategoryErrors";
import { CreateCategoryRequestDto } from "./createCategoryRequestDto";
import { CategoryCoreService } from "../../../../../core/repositories";
import { Injectable } from "@nestjs/common";
import Joi from 'joi';
import { fileJoiSchema } from "../../../../../core";

type Response = Result<CreateCategoryResponseDto, UnexpectedError | CreateCategoryBadRequestError | CreateCategoryAlreadyExistsError>;

@Injectable()
export class CreateCategory implements UseCase<CreateCategoryRequestDto, Response> {
    constructor(private readonly categoryCoreService: CategoryCoreService) {}

    validate(request: CreateCategoryRequestDto) {
        const validationSchema = Joi.object<CreateCategoryRequestDto>({
            name: Joi.string().required(),
            description: Joi.string().optional().allow(''),
            parents: Joi.array().items(Joi.string()).optional(),
            img: fileJoiSchema,
            status: Joi.string().valid('active', 'inactive').optional().default('active'),
            merchant: Joi.string().required(),
        });
        return validateRequest<CreateCategoryRequestDto>(validationSchema, request, 'Joi');
    }
    
    async execute(request: CreateCategoryRequestDto, service?: any): Promise<Response> {
        try {
            const requestValidation = this.validate(request);
            if(requestValidation.isErr()) {
                return err(new CreateCategoryBadRequestError(requestValidation.error));
            }
            const existingCategory = await this.categoryCoreService.getCategory({ merchant: request.merchant, name: request.name, noRegex: true });
            if(existingCategory) {
                return err(new  CreateCategoryAlreadyExistsError());
            }
            const payload = {
                ...request,
                img: ''
            }

            return ok(await this.categoryCoreService.createCategory(payload));
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}