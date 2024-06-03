import { SourceInfo } from './source-info.model';
import { TerminalInfo } from './terminal-info.model';

export interface TerminalActivity {
  before: TerminalInfo;
  after: TerminalInfo;
  source: SourceInfo;
  op: string;
  ts_ms: number;
  transaction: any;
}
