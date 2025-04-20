import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class FormatDataParserInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        if (request.body.tags && typeof request.body.tags === 'string') {
            try {
                request.body.tags = JSON.parse(request.body.tags);
            } catch (e) {
                request.body.tags = request.body.tags
                    .split(',')
                    .map((tag) => tag.trim());
            }
        }

        if (request.body.parents && typeof request.body.parents === 'string') {
            try {
                request.body.parents = JSON.parse(request.body.parents);
            } catch (e) {
                request.body.parents = request.body.parents
                    .split(',')
                    .map((parent) => parent.trim());
            }
        }
        return next.handle();
    }
}
