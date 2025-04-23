import { forwardRef, Module } from '@nestjs/common';
import { AppModule } from '../../app.module';
import { AuthService } from './services/auth.service';
import { GetUser, SignIn } from './UseCases';
import { CreateUser } from './UseCases/createUser/createUser';

@Module({
    imports: [forwardRef(() => AppModule)],
    providers: [AuthService, GetUser, SignIn, CreateUser],
    exports: [AuthService],
})
export class AuthModule {}
