import { Metadata } from '@commerce/domain/models/metadata.model';
import { Terminal } from '@core/models/terminal.model';

export interface TerminalList {
  metadata: Metadata;
  data: Terminal[];
}
