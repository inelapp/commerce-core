import { ApiResponseOptions } from "@nestjs/swagger";
import { baseOkResponse } from "../../../../../core";

export const deleteCategoryResponseSwagger: ApiResponseOptions = {
    status: 200,
    description: 'Category deleted successfully',
    example: baseOkResponse({
        message: 'Category deleted successfully',
        timestamp: new Date().toISOString(),
    })
}