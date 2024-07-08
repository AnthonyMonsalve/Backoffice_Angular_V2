export class AffiliateMaster {
  affiliateMasterSK: number;
  idAffiliateMaster: string;
  rif: string;
  razonSocial: string;
  nombreComercial: string;
  email: string;
  phone: string;
  created: Date;
  address: string;
  chargeEnable: number;
  updateDate: Date;
  status: number;
  origen: string;
  numAffiliates: number;

  constructor(
    affiliateMasterSK: number,
    idAffiliateMaster: string,
    rif: string,
    razonSocial: string,
    nombreComercial: string,
    email: string,
    phone: string,
    created: Date,
    address: string,
    chargeEnable: number,
    updateDate: Date,
    status: number,
    origen: string,
    numAffiliates: number
  ) {
    this.affiliateMasterSK = affiliateMasterSK;
    this.idAffiliateMaster = idAffiliateMaster;
    this.rif = rif;
    this.razonSocial = razonSocial;
    this.nombreComercial = nombreComercial;
    this.email = email;
    this.phone = phone;
    this.created = created;
    this.address = address;
    this.chargeEnable = chargeEnable;
    this.updateDate = updateDate;
    this.status = status;
    this.origen = origen;
    this.numAffiliates = numAffiliates;
  }
}
