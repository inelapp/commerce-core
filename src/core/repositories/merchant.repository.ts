export enum Resource {
    CATEGORY = 'category',
    PRODUCT = 'product',
    MERCHANT = 'merchant',
}

export interface IMerchantRepository {
    isMerchantResource(merchantId: string, resource: Resource, resourceId?: string): Promise<{ hasResource: boolean }>;
}