import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidateQueryParamsMiddleware } from './core';
import { CloudinaryModule } from './providers';
import { VillaCarsModule } from './modules';
import { CategorySchema, MerchantSchema } from './core/model';
import { CategoryCoreService, MerchantCoreService } from './core/repositories/services';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.get<string>('MONGO_URL'),
            }),
            inject: [ConfigService],
        }),
        MongooseModule.forFeature([
            {
                name: 'Merchant',
                schema: MerchantSchema,
                collection: 'merchants',
            },
            {
                name: 'Category',
                schema: CategorySchema,
                collection: 'categories',
            }
        ]),
        forwardRef(() => CloudinaryModule),
        forwardRef(() => VillaCarsModule),
        UserModule,
    ],
    providers: [AppService, CategoryCoreService, MerchantCoreService],
    exports: [AppService, CategoryCoreService, MerchantCoreService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateQueryParamsMiddleware).forRoutes('*');
    }
}
