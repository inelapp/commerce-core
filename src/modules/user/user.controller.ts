import {
    Body,
    Controller,
    Get,
    HttpCode,
    Param,
    Patch,
    Post
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserBadRequestError } from './userErrors';
import { validateRequest } from '../../utils';
import { CreateUserDto, createUserSchema } from './dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('v1/user')
@ApiTags('User')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getUsers() {
        return await this.userService.getUsers();
    }

    @Post()
    @HttpCode(201)
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({  status: 201, description: 'User created successfully' })
    async createUser(@Body() body: CreateUserDto) {
        const validationResult = validateRequest<CreateUserDto>(createUserSchema, body)
        if (validationResult.isErr()) {
            throw new CreateUserBadRequestError(validationResult.error)
        }
        return await this.userService.createUser(validationResult.value);
    }

    @Patch(':id')
    @HttpCode(200)
    updateUser(@Param() params: { id: string }, @Body() body: any) {
        return this.userService.updateUser(params.id, body);
    }
}
