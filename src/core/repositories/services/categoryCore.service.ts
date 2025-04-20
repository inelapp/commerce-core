import { Injectable } from '@nestjs/common';
import { ICategoryFilters, ICategoryRepository } from '../category.repository';
import { Category, CategoryProps } from '../../domain';
import { getDataByFilters, getPaginateAndFilteredData, IPaginateData } from '../../../utils';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category as CategoryModel } from '../../model';
import { CategoryDbResponseDetail, CategoryMaps, CategoryResponseDetail, ICategoryDbResponse } from '../../../core/mappers';

@Injectable()
export class CategoryCoreService implements ICategoryRepository {

    constructor(@InjectModel('Category') private readonly categoryModel: Model<CategoryModel>){}

    async getCategories(merchantId: string, filters?: ICategoryFilters): Promise<IPaginateData<CategoryResponseDetail>> {
        try {
            const { page, limit, ...query } = filters;
            const categories = await getPaginateAndFilteredData<CategoryDbResponseDetail, ICategoryFilters>(page, limit, this.categoryModel, { ...query, merchant: merchantId }, ['merchant']);
            const resultMap = categories.data.map(category => CategoryMaps.toDomainDetail(category));
            return {
                ...categories,
                data: resultMap
            }
        } catch (error) {
            throw error;
        }
    }
    async createCategory(props: CategoryProps): Promise<Category> {
        try {
            const category = new this.categoryModel(props);
            const result = await category.save();
            return CategoryMaps.toDomain(result as unknown as ICategoryDbResponse);
        } catch (error) {
            throw error;
        }
    }
    async getCategory(filters: ICategoryFilters): Promise<CategoryResponseDetail | null> {
        try {
            const category = await getDataByFilters<CategoryDbResponseDetail, ICategoryFilters>(this.categoryModel, filters, ['merchant']);
            return category ? CategoryMaps.toDomainDetail(category) : null;
        } catch (error) {
            throw error;
        }
    }
}
