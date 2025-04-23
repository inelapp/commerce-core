import { forwardRef, Module } from '@nestjs/common';
import { CategoryController } from './controller';
import { CategoryService } from './services';
import { AppModule } from '../../app.module';
import { CreateCategory, DeleteCategory, GetCategories, GetCategory, UpdateCategory } from './UsesCases';
import { UserController } from './controller/user.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [CategoryController, UserController],
  providers: [CategoryService, CreateCategory, GetCategories, UpdateCategory, GetCategory, DeleteCategory],
  imports: [
    forwardRef(() => AppModule),
    forwardRef(() => AuthModule),
  ]
})
export class VillaCarsModule {}
