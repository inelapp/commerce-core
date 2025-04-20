import { ApiBodyOptions } from '@nestjs/swagger';
import { baseOkResponse } from '../../../../../core';

export const updateCategoryRequestSwaggerSchema: ApiBodyOptions = {
    schema: {
        type: 'object',
        properties: {
            name: { type: 'string', example: 'Category Name Updated' },
            description: {
                type: 'string',
                example: 'Category Description Updated',
            },
            parents: {
                type: 'array',
                items: { type: 'string' },
                example: ['parent1 updated', 'parent2 updated'],
            },
            img: {
                type: 'string',
                format: 'binary',
            },
        },
    },
};

export const updateCategoryResponseSwaggerSchema = {
    status: 200,
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
