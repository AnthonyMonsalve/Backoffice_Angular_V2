export interface SourceInfo {
  version: string;
  connector: string;
  name: string;
  ts_ms: number;
  snapshot: string;
  db: string;
  sequence: any;
  schema: string;
  table: string;
  change_lsn: string;
  commit_lsn: string;
  event_serial_no: number;
}
