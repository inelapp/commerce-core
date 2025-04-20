export interface UpdateCategoryRequestDto {
    id: string;
    name: string;
    description: string;
    parents: string[];
    img: string;
    status: string;
}