import Joi from 'joi';
import { GenericObject } from '../../../types';

export const timeZone = 'America/Lima';
export const baseOkResponse = (data: GenericObject) => {
    return {
        success: true,
        result: data,
    }
}
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
};
export const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
export const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
export const fileJoiSchema = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
        .valid(...allowedMimeTypes)
        .required(),
    buffer: Joi.binary().required(),
    size: Joi.number()
        .max(5 * 1024 * 1024)
        .required(),
}).optional();

export const defaultFilterSchema = Joi.object({
    page: Joi.alternatives(Joi.string(), Joi.number()).default(1).optional(),
    limit: Joi.alternatives(Joi.string(), Joi.number()).default(10).optional(),
    createdAt: Joi.date().optional(),
    updatedAt: Joi.date().optional(),
    $ne: Joi.object().optional(),
    fromDate: Joi.date().optional(),
    toDate: Joi.date().optional(),
})
