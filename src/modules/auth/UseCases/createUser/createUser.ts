import { err, ok, Result } from "neverthrow";
import { CreateUserResponseDto } from "./createUserResponseDto";
import { UnexpectedError, UseCase, validateRequest } from "../../../../utils";
import { CreateUserBadRequestError, CreateUserEmailAlreadyExistsError, CreateUserUsernameAlreadyExistsError } from "./createUserErrors";
import { CreateUserRequestDto } from "./createUserRequestDto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserAuthCoreService } from "../../../../core";
import Joi from "joi";

type Response = Result<CreateUserResponseDto, UnexpectedError | CreateUserBadRequestError | CreateUserEmailAlreadyExistsError | CreateUserUsernameAlreadyExistsError>;

@Injectable()
export class CreateUser implements UseCase<CreateUserRequestDto, Response> {
    constructor(
        @Inject(forwardRef(() => UserAuthCoreService))
        private readonly userAuthService: UserAuthCoreService
    ){}

    validate(request: CreateUserRequestDto) {
        const validationSchema = Joi.object<CreateUserRequestDto>({
            email: Joi.string().email().required(),
            username: Joi.string().optional(),
            merchant: Joi.string().required(),
            password: Joi.string().required(),
            roles: Joi.array().items(Joi.string()).optional(),
        });
        return validateRequest<CreateUserRequestDto>(validationSchema, request, 'Joi');
            
    }
    async execute(request: CreateUserRequestDto, service?: any): Promise<Response> {
        try {
            const validationResult = this.validate(request);
            if (validationResult.isErr()) {
                return err(new CreateUserBadRequestError(validationResult.error));
            }
            const userValidated = validationResult.value;
            const userByEmail = await this.userAuthService.getUser({ email: userValidated.email, merchant: userValidated.merchant }, { noRegex: true });
            if (userByEmail) {
                return err(new CreateUserEmailAlreadyExistsError());
            }
            const userByUsername = await this.userAuthService.getUser({ username: userValidated.username || '', merchant: userValidated.merchant }, { noRegex: true });
            if (userByUsername) {
                return err(new CreateUserUsernameAlreadyExistsError());
            }
            return ok(await this.userAuthService.createUser(userValidated));
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }
}