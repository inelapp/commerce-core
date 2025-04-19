import { z } from 'zod';
import { createZodDto } from 'nestjs-zod';

export const createUserSchema = z.object({
    name: z
        .string({
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        })
        .min(1, {
            message: 'Name is required',
        })
        .describe('User name'),
    email: z.string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string'
    }).email('Invalid email address').describe('User email'),
});

export class CreateUserDto extends createZodDto(createUserSchema) {}
