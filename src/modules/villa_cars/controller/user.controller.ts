import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../../modules/auth/services/auth.service';
import { CreateUserRequestDto, CreateUserResponseDto, createUserSwaggerSchema, SignInRequestDto, signInRequestSwaggerSchema, SignInResponseDto, signInResponseSwaggerSchema } from '../../../modules/auth/UseCases';
import { genericBadRequestErrorResponse } from 'src/core';

@Controller('villa-cars/v1/user')
@ApiTags('User')
export class UserController {
    constructor(
        private readonly authService: AuthService
    ){}

    @Post('sign-in')
    @ApiOperation({ summary: 'Sign in a user' })
    @ApiBody(signInRequestSwaggerSchema)
    @ApiResponse(signInResponseSwaggerSchema)
    @ApiResponse(genericBadRequestErrorResponse)
    async signIn(@Body() request: SignInRequestDto): Promise<SignInResponseDto> {
        return await this.authService.signIn(request);
    }

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiBody(createUserSwaggerSchema)
    @ApiResponse(genericBadRequestErrorResponse)
    async createUser(@Body() request: CreateUserRequestDto): Promise<CreateUserResponseDto> {
        return await this.authService.createUser(request);
    }
}
