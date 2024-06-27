export class Terminal {
  TerminalSK: number;
  Terminal: string;
  IdAffiliate: string | null;
  IdBank: number;
  Active: boolean;
  InUse: boolean;
  OnClosure: boolean;
  Available: boolean;
  LastUsed: string;
  LastReferenceCode: number;
  Fisico: string | null;
  Origen: string;

  constructor(
    TerminalSK: number,
    Terminal: string,
    IdAffiliate: string | null,
    IdBank: number,
    Active: boolean,
    InUse: boolean,
    OnClosure: boolean,
    Available: boolean,
    LastUsed: string,
    LastReferenceCode: number,
    Fisico: string | null,
    Origen: string
  ) {
    this.TerminalSK = TerminalSK;
    this.Terminal = Terminal;
    this.IdAffiliate = IdAffiliate;
    this.IdBank = IdBank;
    this.Active = Active;
    this.InUse = InUse;
    this.OnClosure = OnClosure;
    this.Available = Available;
    this.LastUsed = LastUsed;
    this.LastReferenceCode = LastReferenceCode;
    this.Fisico = Fisico;
    this.Origen = Origen;
  }
}
