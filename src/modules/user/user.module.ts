import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './model/user.model';

@Module({
    imports: [MongooseModule.forFeature([{
        name: 'User',
        schema: UserSchema,
        collection: 'users'
    }])],
    controllers: [UserController],
    providers: [UserService],
})
export class UserModule {}
