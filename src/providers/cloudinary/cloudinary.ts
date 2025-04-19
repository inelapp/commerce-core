import { v2 as cloudinary } from 'cloudinary';
import { AppService } from '../../services';

export const CloudinaryProvider = {
    provide: 'CLOUDINARY',
    inject: [AppService],
    useFactory: (appService: AppService) => {
        const { api_key, api_secret, cloud_name } = appService.getCloudinaryParams();
        cloudinary.config({
            api_key,
            api_secret,
            cloud_name
        });
        return cloudinary;
    },
};
