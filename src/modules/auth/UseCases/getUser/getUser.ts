import { err, ok, Result } from "neverthrow";
import { GetUserResponseDto } from "./getUserResponseDto";
import { UnexpectedError, UseCase, validateRequest } from "../../../../utils";
import { GetUserBadRequestError, GetUserNotFoundError } from "./getUserErrors";
import { GetUserRequestDto } from "./getUserRequestDto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { genericGetResourceSchema, UserAuthCoreService } from "../../../../core";
import Joi from "joi";

type Response = Result<GetUserResponseDto, UnexpectedError | GetUserBadRequestError | GetUserNotFoundError>;

@Injectable()
export class GetUser implements UseCase<GetUserRequestDto, Response> {
    constructor(
        @Inject(forwardRef(() => UserAuthCoreService))
        private readonly userCoreService: UserAuthCoreService,
    ){}

    validate(request: GetUserRequestDto) {
        const validationSchema = Joi.object<GetUserRequestDto>(genericGetResourceSchema)
        return validateRequest<GetUserRequestDto>(validationSchema, request, 'Joi');
    }
    async execute(request: GetUserRequestDto, service?: any): Promise<Response> {
        try {
            const requestValidation = this.validate(request);
            if (requestValidation.isErr()) {
                return err(new GetUserBadRequestError(requestValidation.error));
            }
            const { id, merchant } = requestValidation.value;
            const result = await this.userCoreService.getUser({ id, merchant });
            if(!result) {
                return err(new GetUserNotFoundError());
            }
            return ok(result as any);
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }

}