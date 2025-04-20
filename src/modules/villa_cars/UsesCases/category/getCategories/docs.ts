import { ApiQueryOptions, ApiResponseOptions } from '@nestjs/swagger';
import { baseOkResponse } from 'src/core';

export const getCategoriesSwaggerParams: ApiQueryOptions[] = [
    {
        name: 'page',
        type: 'number',
        required: false,
        example: 1,
        description: 'Page number',
    },
    {
        name: 'limit',
        type: 'number',
        required: false,
        example: 10,
        description: 'Number of records per page',
    },
    {
        name: 'name',
        type: 'string',
        required: false,
        description: 'Category name',
    },
    {
        name: 'status',
        type: 'string',
        required: false,
        description: 'Category status',
    }
];

export const getCategoriesOkResponseSwagger: ApiResponseOptions = {
    status: 200,
    description: 'Ok',
    example: {
        ...baseOkResponse({
            data: [
                {
                    id: '6804a17665ad3059fb2b8fc0',
                    name: 'Radiadores',
                    description: '',
                    status: 'active',
                    merchant: {
                        id: '680475d58c6ce2b9e4725210',
                        name: 'villa_cars',
                        slug: '',
                        email: '',
                        contactPhoneNumber: '',
                        status: 'active',
                    },
                    parents: [],
                    img: '',
                    createdAt: '20-04-2025, 02:25:42 am',
                    updatedAt: '20-04-2025, 02:25:42 am',
                },
            ],
            page: 1,
            limit: 2,
            totalRecords: 1,
            totalPages: 1,
        }),
    },
};
