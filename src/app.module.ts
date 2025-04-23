import {
    forwardRef,
    MiddlewareConsumer,
    Module,
    NestModule,
} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './services/app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ValidateQueryParamsMiddleware } from './core';
import { CloudinaryModule } from './providers';
import { VillaCarsModule } from './modules';
import { CategorySchema, MerchantSchema } from './core/model';
import { CategoryCoreService, MerchantCoreService, UserAuthCoreService } from './core/repositories';
import { AuthModule } from './modules/auth/auth.module';
import { UserSchema } from './core/model/user';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenSchema } from './core/model/refreshToken';
import { hashText } from './utils';

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
        MongooseModule.forFeatureAsync([
            {
                name: 'Merchant',
                useFactory: () => {
                    const schema = MerchantSchema;
                    return schema;
                },
                collection: 'merchants',
            },
            {
                name: 'Category',
                useFactory: () => {
                    const schema = CategorySchema;
                    return schema;
                },
                collection: 'categories',
            },
            {
                name: 'User',
                useFactory: () => {
                    const schema = UserSchema;
                    schema.pre('save', async function (next) {
                        this.password = await hashText(this.password);
                        next();
                    })
                    return schema;
                },
                collection: 'users',
            },
            {
                name: 'RefreshToken',
                useFactory: () => {
                    const schema = RefreshTokenSchema;
                    return schema;
                },
                collection: 'refreshTokens',
            }
        ]),
        JwtModule.registerAsync({
            global: true,
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET'),
                signOptions: {
                    expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
                },
            }),
            inject: [ConfigService],
        }),
        forwardRef(() => CloudinaryModule),
        forwardRef(() => VillaCarsModule),
        forwardRef(() => AuthModule)
    ],
    providers: [AppService, CategoryCoreService, MerchantCoreService, UserAuthCoreService],
    exports: [AppService, CategoryCoreService, MerchantCoreService, UserAuthCoreService],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(ValidateQueryParamsMiddleware).forRoutes('*');
    }
}
