import { GenericFilters, GenericOptions } from "../../types";
import { IPaginateData } from "../../utils";
import { Category, CategoryProps } from "../domain";
import { CategoryResponseDetail } from "../mappers";

export type ICategoryFilters = {
    id?: string;
    name?: string;
    status?: string;
    merchant?: string;
} & GenericFilters & GenericOptions

export interface ICategoryRepository {
    getCategories(merchantId: string, filters?: ICategoryFilters): Promise<IPaginateData<CategoryResponseDetail>>;
    createCategory(props: CategoryProps): Promise<Category>;
    getCategory(filters: ICategoryFilters): Promise<CategoryResponseDetail | null>;
    updateCategory(id: string, props: Partial<CategoryProps>): Promise<CategoryResponseDetail>
    deleteCategory(id: string, merchant: string): Promise<void>;
}