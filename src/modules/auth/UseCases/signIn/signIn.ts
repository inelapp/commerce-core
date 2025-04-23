import { err, ok, Result } from "neverthrow";
import { SignInResponseDto } from "./signInResponseDto";
import { SignInBadRequestError, SignInEmailNotFoundError, SignInInvalidPasswordError } from "./signInErrors";
import { compareHash, UnexpectedError, UseCase, validateRequest } from "src/utils";
import { SignInRequestDto } from "./signInRequestDto";
import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { UserAuthCoreService } from "src/core";
import Joi from "joi";
import { JwtService } from "@nestjs/jwt";

type Response = Result<SignInResponseDto, SignInBadRequestError | SignInEmailNotFoundError | SignInInvalidPasswordError | UnexpectedError>;

@Injectable()
export class SignIn implements UseCase<SignInRequestDto, Response> {
    constructor(
        @Inject(forwardRef(() => UserAuthCoreService))
        private readonly userCoreService: UserAuthCoreService,
        private readonly jwtService: JwtService
    ){}

    validate(request: SignInRequestDto) {
        const validationSchema = Joi.object<SignInRequestDto>({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            merchant: Joi.string().required(),
        })
        return validateRequest<SignInRequestDto>(validationSchema, request, 'Joi');
    }

    async execute(request: SignInRequestDto, service?: any): Promise<Response> {
        try {
            const requestValidation = this.validate(request);
            if (requestValidation.isErr()) {
                return err(new SignInBadRequestError(requestValidation.error));
            }
            const { email, password, merchant } = requestValidation.value;
            const userByEmail = await this.userCoreService.getUser({ email, merchant });
            if (!userByEmail) {
                return err(new SignInEmailNotFoundError());
            }
            const isPasswordValid = await compareHash(password, userByEmail.password);
            if (!isPasswordValid) {
                return err(new SignInInvalidPasswordError());
            }
            const accessToken = await this.jwtService.signAsync({
                userId: userByEmail.id,
                email: userByEmail.email,
                merchant: userByEmail.merchant,
                roles: userByEmail.roles,
            });
            const refreshToken = await this.jwtService.signAsync({
                userId: userByEmail.id,
                email: userByEmail.email,
                merchant: userByEmail.merchant,
                roles: userByEmail.roles,
            }, {
                expiresIn: '7d',
            });
            // 15 min
            const accessTokenExpiresIn = 900;
            return ok({
                accessToken,
                expiresIn: accessTokenExpiresIn,
                refreshToken
            });
        } catch (error) {
            return err(new UnexpectedError(error));
        }
    }

}