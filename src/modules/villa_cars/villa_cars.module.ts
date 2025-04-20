import { forwardRef, Module } from '@nestjs/common';
import { CategoryController } from './controller';
import { CategoryService } from './services';
import { AppModule } from 'src/app.module';
import { CreateCategory, GetCategories } from './UsesCases';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, CreateCategory, GetCategories],
  imports: [
    forwardRef(() => AppModule),
  ]
})
export class VillaCarsModule {}
