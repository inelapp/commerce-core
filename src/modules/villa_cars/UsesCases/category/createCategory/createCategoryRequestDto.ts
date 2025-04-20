import { CategoryProps } from "../../../../../core/domain";

export type CreateCategoryRequestDto = Omit<CategoryProps, 'img'> & { img: Express.Multer.File };