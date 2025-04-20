import { Injectable } from '@nestjs/common';
import { IMerchantRepository, Resource } from '../merchant.repository';

@Injectable()
export class MerchantCoreService implements IMerchantRepository {
    async isMerchantResource(merchantId: string, resource: Resource, resourceId?: string): Promise<{ hasResource: boolean; }> {
        throw new Error('Method not implemented.');
    }
}
