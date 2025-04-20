import { ApiResponseOptions } from "@nestjs/swagger";
import { baseOkResponse } from "../../../../../core";

export const getCategoryResponseSwaggerSchema: ApiResponseOptions = {
    status: 200,
    description: 'Ok',
    example: baseOkResponse({
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
    })
}