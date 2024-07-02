import { AffiliateMaster } from '../../domain/models/affiliate-master.model';
import { Metadata } from '../../domain/models/metadata.model';

export interface AffiliateMasterList {
  metadata: Metadata;
  data: AffiliateMaster[];
}
