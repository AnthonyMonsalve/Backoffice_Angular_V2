import { Affiliate } from '../../domain/models/affiliate.model';

export interface AffiliateList {
  count: number;
  data: Affiliate[];
}
