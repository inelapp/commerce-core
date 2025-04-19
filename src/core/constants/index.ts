export const timeZone = 'America/Lima'
export const genericBadRequestErrorResponse = {
    status: 400,
    description: 'Bad Request',
    schema: {
        type: 'object',
        properties: {
            success: { type: 'boolean', example: false },
            statusCode: { type: 'number', example: 400 },
            message: { type: 'string', example: 'Invalid input' },
            type: { type: 'string', example: 'Bad Request' },
            path: { type: 'string', example: '/api/v1/<service>' },
        },
    },
}