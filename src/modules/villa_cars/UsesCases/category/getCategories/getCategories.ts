import { err, ok, Result } from "neverthrow";
import { GetCategoriesResponseDto } from "./getCategoriesResponseDto";
import { UnexpectedError, UseCase, validateRequest } from "../../../../../utils";
import { GetCategoriesBadRequestError } from "./getCategoriesErrors";
import { CategoryCoreService, defaultFilterSchema } from "../../../../../core";
import { GetCategoriesRequestDto } from "./getCategoriesRequestDto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import Joi from "joi";

type Response = Result<GetCategoriesResponseDto, UnexpectedError | GetCategoriesBadRequestError>;

@Injectable()
export class GetCategories implements UseCase<GetCategoriesRequestDto, Response> {
    constructor(
        @Inject(forwardRef(() => CategoryCoreService))
        private readonly categoryCoreService: CategoryCoreService
    ){}
    
    validate(request: GetCategoriesRequestDto) {
        const validationSchema = defaultFilterSchema.concat(Joi.object<GetCategoriesRequestDto>({
            id: Joi.string().optional(),
            name: Joi.string().optional(),
            status: Joi.string().valid('active', 'inactive').optional(),
            merchant: Joi.string().optional(),
            merchantId: Joi.string().optional(),
        }))
        return validateRequest<GetCategoriesRequestDto>(validationSchema, request, 'Joi');
    }
    
    async execute(request: GetCategoriesRequestDto, service?: any): Promise<Response> {
        try {
            const filterValidation = this.validate(request);
            if(filterValidation.isErr()){
                return err(new GetCategoriesBadRequestError(filterValidation.error));
            }
            const { merchantId } = filterValidation.value;
            const result = await this.categoryCoreService.getCategories(merchantId, filterValidation.value)
            return ok(result);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}