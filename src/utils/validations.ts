import Joi from "joi";
import { err, ok, Result } from "neverthrow";

export function validateRequest<RequestType>(schema: Zod.Schema<RequestType> | Joi.Schema<RequestType>, payload: RequestType, validorType: 'Joi' | 'Zod'): Result<RequestType, string>{
    if (validorType == 'Zod') {
        const validationSchema = schema as Zod.Schema<RequestType>;
        const { error, data } = validationSchema.safeParse(payload);
        if(error) {
            const errorMessage = error.issues.map(issue => issue.message).join('. ');
            return err(errorMessage);
        }
        return ok(data);
    }
    if (validorType == 'Joi') {
        const validationSchema = schema as Joi.Schema<RequestType>;
        const { error, value } = validationSchema.validate(payload, { abortEarly: false });
        if (error) {
            return err(error.details.map(detail => detail.message).join('. '));
        }
        return ok(value);
    }
}
