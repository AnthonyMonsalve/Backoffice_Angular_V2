import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { Metadata } from '@commerce/domain/models/metadata.model';

export interface AffiliateMasterList {
  metadata: Metadata;
  data: AffiliateMaster[];
}
