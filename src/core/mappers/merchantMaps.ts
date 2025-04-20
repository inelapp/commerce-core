export interface IMerchantDbResponse {
    _id: string;
    name: string;
    slug: string;
    email: string;
    contactPhoneNumber: string;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}