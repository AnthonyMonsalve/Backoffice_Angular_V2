import { Affiliate } from '@core/models/affiliate.model';
import { Metadata } from '@commerce/domain/models/metadata.model';

export interface AffiliateList {
  metadata: Metadata;
  data: Affiliate[];
}
