export interface CreateCategoryResponseDto {
    id: string;
    name: string;
    description: string;
    parents: string[];
    img: string;
    status: string;
    merchant: any;
    createdAt: Date | string | null;
    updatedAt: Date | string | null;
}