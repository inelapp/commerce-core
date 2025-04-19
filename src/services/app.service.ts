import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
    constructor(private readonly configService: ConfigService){}

    getMongoDbUrl() {
        return this.configService.get<string>('MONGO_URL') || 'mongodb://localhost:27017/testDb';
    }

    getCloudinaryParams() {
        return {
            cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
            api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
            api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
        }
    }
}
