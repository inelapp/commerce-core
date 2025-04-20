import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategory, CreateCategoryRequestDto, GetCategories, GetCategoriesRequestDto } from '../UsesCases';

@Injectable()
export class CategoryService {
    constructor(
        private readonly _createCategory: CreateCategory,
        private readonly _getCategories: GetCategories,
    ) {}

    async createCategory(request: CreateCategoryRequestDto) {
        const result = await this._createCategory.execute(request)
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), { cause: error });
        }
        return result.value;
    }

    async getCategories(request: GetCategoriesRequestDto) {
        const result = await this._getCategories.execute(request)
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), { cause: error  });
        }
        return result.value;
    }
}
