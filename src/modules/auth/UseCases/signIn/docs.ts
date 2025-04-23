import { ApiBodyOptions, ApiResponseOptions } from "@nestjs/swagger";
import { baseOkResponse } from "../../../../core";

export const signInRequestSwaggerSchema: ApiBodyOptions = {
    schema: {
        type: "object",
        properties: {
            email: {
                type: "string",
                example: "user@inel.pe",
                description: "Email of the user.",
            },
            password: {
                type: "string",
                example: "genericPassword",
                description: "Password of the user.",
            },
        }
    }
}

export const signInResponseSwaggerSchema: ApiResponseOptions = {
    status: 200,
    description: "User signed in successfully.",
    example: baseOkResponse({
        accesstoken: "access_token",
        expiresIn: 900,
    })
}