import { Inject, Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiErrorResponse } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import { err, ok, Result } from 'neverthrow';

export interface CloudinaryUploadResponse {
    public_id: string;
    version: number;
    signature: string;
    width: number;
    height: number;
    format: string;
    resource_type: string;
    created_at: string;
    bytes: number;
    type: string;
    url: string;
    secure_url: string;
}

@Injectable()
export class CloudinaryService {
    constructor(
        @Inject('CLOUDINARY')
        private readonly cloudinaryClient: typeof cloudinary,
    ) {}

    getCloudinaryStorage() {
        return new CloudinaryStorage({
            cloudinary: this.cloudinaryClient,
            params: {
                folder: 'vc_images',
                allowed_formats: ['jpg', 'png', 'jpeg', 'gif'],
                transformation: [{ width: 500, height: 500, crop: 'limit' }],
            } as any,
        });
    }

    async uploadImage(file: Express.Multer.File): Promise<Result<CloudinaryUploadResponse, UploadApiErrorResponse>> {
        return new Promise((resolve, reject) => {
            this.cloudinaryClient.uploader
                .upload_stream({ 
                    folder: 'vc_images',
                    format: 'webp',
                }, (error, result) => {
                    if (error) return reject(err(error));
                    resolve(ok(result));
                })
                .end(file.buffer);
        });
    }
}
