import { HttpException } from "@nestjs/common";

export interface UseCase<Request, Response> {
    validate(request: Request): any;
    execute(request: Request, service?: any): Promise<Response>;
}

export class UnexpectedError extends HttpException {
    constructor(message: string) {
        console.error(message);
        super('An unexpected error occurred', 500);
    }
}