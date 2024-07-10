import { Affiliate } from '@commerce/domain/models/affiliate.model';
import { Metadata } from '@commerce/domain/models/metadata.model';

export interface AffiliateList {
  metadata: Metadata;
  data: Affiliate[];
}
