import { forwardRef, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { TestModule } from './modules/test/test.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidateQueryParamsMiddleware } from './core';
import { CloudinaryModule } from './providers';

@Module({
    imports: [
        UserModule,
        TestModule,
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri:
                    configService.get<string>('MONGO_URL') ||
                    'mongodb://localhost:27017/testDb',
            }),
            inject: [ConfigService],
        }),
        forwardRef(() => CloudinaryModule),
    ],
    providers: [AppService],
    exports: [AppService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateQueryParamsMiddleware).forRoutes('*');
    }
}
