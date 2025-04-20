import { Category } from "../domain";
import { IMerchantDbResponse } from "./merchantMaps";

export interface ICategoryDbResponse {
    _id: string;
    merchant: string;
    name: string;
    status: string;
    description: string;
    parents: string[];
    img: string;
    createdAt: Date;
    updatedAt: Date;
}

export type CategoryDbResponseDetail = Omit<ICategoryDbResponse, 'merchant'> & { merchant: IMerchantDbResponse }
export type CategoryResponseDetail = Omit<Category, 'merchant'> & Partial<{ merchant: Omit<IMerchantDbResponse, '_id'> & { id: string } }>

export class CategoryMaps {
    static toDomain(category: ICategoryDbResponse): Category {
        return {
            id: category._id,
            name: category.name || '',
            description: category.description || '',
            status: category.status || '',
            merchant: category.merchant || '',
            parents: category.parents || [],
            img: category.img || '',
            createdAt: category.createdAt,
            updatedAt: category.updatedAt,
        }
    }

    static toDomainDetail(category: CategoryDbResponseDetail): CategoryResponseDetail {
        return {
            id: category._id,
            name: category.name || '',
            description: category.description || '',
            status: category.status || '',
            merchant: category.merchant ? {
                id: category.merchant._id,
                name: category.merchant.name || '',
                slug: category.merchant.slug || '',
                email: category.merchant.email || '',
                contactPhoneNumber: category.merchant.contactPhoneNumber || '',
                status: category.merchant.status || '',
                createdAt: category.merchant.createdAt,
                updatedAt: category.merchant.updatedAt,
            } : null,
            parents: category.parents || [],
            img: category.img || '',
            createdAt: category.createdAt,
            updatedAt: category.updatedAt
        }
    }
}