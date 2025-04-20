import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { allowedExtensions, allowedMimeTypes } from '../constants';

class ValidateFileInvalidMimeTypeException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

class ValidateFileInvalidExtensionException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

class ValidateFileInvalidSizeException extends BadRequestException {
  constructor(message: string) {
    super(message);
  }
}

@Injectable()
export class ValidateFilePipe implements PipeTransform {
  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    const fileExtension = file.originalname.split('.').pop();
    const fileMimeType = file.mimetype;
    
    const isValidMimeType = allowedMimeTypes.includes(fileMimeType);
    const isValidExtension = allowedExtensions.includes(`.${fileExtension}`);
    const isValidSize = file.size <= 5 * 1024 * 1024; // 5MB

    if (!isValidMimeType) {
      throw new ValidateFileInvalidMimeTypeException(
        `Invalid file mimetype. Allowed types are: ${allowedMimeTypes.join(', ')}`,
      );
    }

    if (!isValidExtension) {
      throw new ValidateFileInvalidExtensionException(
        `Invalid file extension. Allowed extensions are: ${allowedExtensions.join(', ')}`,
      );
    }

    if (!isValidSize) {
      throw new ValidateFileInvalidSizeException(
        `Invalid file size. Maximum allowed size is 5MB`,
      );
    }

    return file;
  }
}
