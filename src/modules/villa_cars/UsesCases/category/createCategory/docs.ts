import { ApiBodyOptions, ApiResponseOptions } from '@nestjs/swagger';
import { baseOkResponse } from '../../../../../core';

export const createCategoryRequestSwagger: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'Category Name' },
            description: { type: 'string', example: 'Category Description' },
            parents: {
                type: 'array',
                items: { type: 'string' },
                example: ['parent1', 'parent2'],
            },
            img: {
                type: 'string',
                format: 'binary',
            },
        },
    },
};

export const createCategoryOkResponseSwagger: ApiResponseOptions = {
    status: 201,
    description: 'Ok',
    example: {
        ...baseOkResponse({
            id: '6804a5902f059a4117172df5',
            name: 'Category Name',
            description: 'Category Description',
            status: 'active',
            merchant: '680475d58c6ce2b9e4725210',
            parents: ['parent1', 'parent2'],
            img: 'https://example.com/image.jpg',
            createdAt: '20-04-2025, 02:43:12 am',
            updatedAt: '20-04-2025, 02:43:12 am',
        }),
    },
};
