import { err, ok, Result } from "neverthrow";
import { GetCategoryResponseDto } from "./getCategoryResponseDto";
import { UnexpectedError, UseCase, validateRequest } from "../../../../../utils";
import { GetCategoryBadRequestError, GetCategoryNotFoundError } from "./getCategoryErrors";
import { GetCategoryRequestDto } from "./getCategoryRequestDto";
import Joi from "joi";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { CategoryCoreService, genericGetResourceSchema } from "../../../../../core";

type Response = Result<GetCategoryResponseDto, UnexpectedError | GetCategoryBadRequestError | GetCategoryNotFoundError>;

@Injectable()
export class GetCategory implements UseCase<GetCategoryRequestDto, Response> {
    constructor(
        @Inject(forwardRef(() => CategoryCoreService))
        private readonly categoryCoreService: CategoryCoreService,
    ){}

    validate(request: GetCategoryRequestDto) {
        const validationSchema = Joi.object<GetCategoryRequestDto>(genericGetResourceSchema)
        return validateRequest<GetCategoryRequestDto>(validationSchema, request, 'Joi');
    }

    async execute(request: GetCategoryRequestDto, service?: any): Promise<Response> {
        try {
            const requestValidation = this.validate(request);
            if (requestValidation.isErr()) {
                return err(new GetCategoryBadRequestError(requestValidation.error));
            }
            const { id, merchant } = requestValidation.value;
            const result = await this.categoryCoreService.getCategory({ id, merchant });

            if(!result) {
                return err(new GetCategoryNotFoundError());
            }

            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}