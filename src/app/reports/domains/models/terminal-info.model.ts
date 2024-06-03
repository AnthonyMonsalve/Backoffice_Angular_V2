export interface TerminalInfo {
  Id: number;
  IdAffiliate: string;
  Terminal: string;
  IdBank: number;
  Active: boolean;
  InUse: boolean;
  OnClosure: boolean;
  Available: boolean;
  LastUsed: number;
  Timestamp: number;
  LastReferenceCode: number;
  LastLote: number;
  LastCorrelative: number;
  Fisico: any;
}
