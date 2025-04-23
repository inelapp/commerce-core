import { IMerchantDbResponse } from "../../../../core";

export type GetUserResponseDto = {
    id: string;
    username: string;
    email: string;
    roles: string[];
    status: string;
    merchant: IMerchantDbResponse | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}