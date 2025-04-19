import { err, ok, Result } from "neverthrow";

export function validateRequest<RequestType>(schema: Zod.Schema<RequestType>, payload: RequestType): Result<RequestType, string>{
    const { error, data } = schema.safeParse(payload);
    if(error) {
        const errorMessage = error.issues.map(issue => issue.message).join('. ');
        return err(errorMessage);
    }
    return ok(data);
}
