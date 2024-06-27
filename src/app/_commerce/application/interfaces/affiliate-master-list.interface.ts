import { AffiliateMaster } from '../../domain/models/affiliate-master.model';

export interface AffiliateMasterList {
  count: number;
  data: AffiliateMaster[];
}
