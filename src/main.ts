import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter, ResponseInterceptor } from './core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { patchNestJsSwagger } from 'nestjs-zod';

async function bootstrap() {
    patchNestJsSwagger();
    const app = await NestFactory.create(AppModule);
    app.useGlobalFilters(new AllExceptionFilter());
    app.useGlobalInterceptors(new ResponseInterceptor());
    app.setGlobalPrefix('api');

    const config = new DocumentBuilder()
        .setTitle('Example API')
        .setDescription('The example API description')
        .setVersion('1.0')
        .build();
    const documentFactory = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, documentFactory);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
