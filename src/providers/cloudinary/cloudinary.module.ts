import { forwardRef, Module } from '@nestjs/common';
import { CloudinaryProvider } from './cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { AppModule } from '../../app.module';

@Module({
    imports: [forwardRef(() => AppModule)],
    providers: [CloudinaryProvider, CloudinaryService],
    exports: [CloudinaryProvider, CloudinaryService],
})
export class CloudinaryModule {}
