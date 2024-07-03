import { Affiliate } from '../../domain/models/affiliate.model';
import { Metadata } from '../../domain/models/metadata.model';

export interface AffiliateList {
  metadata: Metadata;
  data: Affiliate[];
}
