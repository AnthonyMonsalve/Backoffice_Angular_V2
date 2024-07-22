export class Closure {
  affiliateSK: number;
  bankSK: number;
  terminalSK: number;
  timeId: number;
  closureId: string;
  lote: number;
  qty: number;
  qtyValid: number;
  amountGross: number;
  amountNet: number;
  taxISLR: number;
  commision: number;
  origen: string;

  constructor(
    affiliateSK: number,
    bankSK: number,
    terminalSK: number,
    timeId: number,
    closureId: string,
    lote: number,
    qty: number,
    qtyValid: number,
    amountGross: number,
    amountNet: number,
    taxISLR: number,
    commision: number,
    origen: string
  ) {
    this.affiliateSK = affiliateSK;
    this.bankSK = bankSK;
    this.terminalSK = terminalSK;
    this.timeId = timeId;
    this.closureId = closureId;
    this.lote = lote;
    this.qty = qty;
    this.qtyValid = qtyValid;
    this.amountGross = amountGross;
    this.amountNet = amountNet;
    this.taxISLR = taxISLR;
    this.commision = commision;
    this.origen = origen;
  }
}
