import { ApiResponseOptions } from "@nestjs/swagger";
import { baseOkResponse } from "../../../../core";

export const getUserResponseSwaggerSchema: ApiResponseOptions = {
    status: 200,
    description: 'Ok',
    example: baseOkResponse({
        id: '6804a5902f059a4117172df5',
        username: 'username',
        email: '',
        roles: ['USER'],
        status: 'active',
        merchant: {
            id: '680475d58c6ce2b9e4725210',
            name: 'Merchant Name',
            status: 'active',
            createdAt: '20-04-2025, 02:43:12 am',
            updatedAt: '20-04-2025, 02:43:12 am',
        },
        createdAt: '20-04-2025, 02:43:12 am',
        updatedAt: '20-04-2025, 02:43:12 am',
    })
}