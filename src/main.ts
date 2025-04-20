import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
    AllExceptionFilter,
    ResponseInterceptor,
    SwaggerFactory,
} from './core';
import { patchNestJsSwagger } from 'nestjs-zod';
import morgan from 'morgan';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
    patchNestJsSwagger();
    const app = await NestFactory.create(AppModule);
    morgan.token('id', (req: any) => req.id || uuid());
    morgan.token('body', (req: any) => JSON.stringify(req.body));
    morgan.token('query', (req: any) => JSON.stringify(req.query));
    const customFormat =
        ':id :method :url :status :response-time ms - :res[content-length] - :body - :query';
    app.use(morgan(customFormat));

    app.use(
        morgan(
            '[:date[iso]] :method :url :status :response-time ms - :res[content-length]',
            {
                skip: (req, res) => res.statusCode < 400,
            },
        ),
    );
    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.setGlobalPrefix('api');

    SwaggerFactory.setupMerchantDocs(app);

    const configService = app.get(ConfigService);
    const port = configService.get<number>('PORT') || 3000;
    await app.listen(port);
}
bootstrap();
