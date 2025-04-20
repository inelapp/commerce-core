import { forwardRef, Module } from '@nestjs/common';
import { CategoryController } from './controller';
import { CategoryService } from './services';
import { AppModule } from '../../app.module';
import { CreateCategory, DeleteCategory, GetCategories, GetCategory, UpdateCategory } from './UsesCases';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CreateCategory, GetCategories, UpdateCategory, GetCategory, DeleteCategory],
  imports: [
    forwardRef(() => AppModule),
  ]
})
export class VillaCarsModule {}
