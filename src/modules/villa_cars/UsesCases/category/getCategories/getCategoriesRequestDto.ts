import { ICategoryFilters } from "../../../../../core/repositories";

export type GetCategoriesRequestDto = { merchantId: string } & ICategoryFilters;