import { HttpException, Injectable } from '@nestjs/common';
import { CreateCategory, CreateCategoryRequestDto, DeleteCategory, DeleteCategoryRequestDto, GetCategories, GetCategoriesRequestDto, GetCategory, GetCategoryRequestDto, UpdateCategory, UpdateCategoryRequestDto } from '../UsesCases';

@Injectable()
export class CategoryService {
    constructor(
        private readonly _createCategory: CreateCategory,
        private readonly _getCategories: GetCategories,
        private readonly _updateCategory: UpdateCategory,
        private readonly _getCategory: GetCategory,
        private readonly _deleteCategory: DeleteCategory,
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

    async updateCategory(request: UpdateCategoryRequestDto) {
        const result = await this._updateCategory.execute(request)
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), { cause: error  });
        }
        return result.value;
    }

    async getCategory(request: GetCategoryRequestDto) {
        const result = await this._getCategory.execute(request)
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), { cause: error  });
        }
        return result.value;
    }

    async deleteCategory(request: DeleteCategoryRequestDto) {
        const result = await this._deleteCategory.execute(request)
        if (result.isErr()) {
            const error = result.error;
            throw new HttpException(error.message, error.getStatus(), { cause: error  });
        }
        return result.value;
    }
}
