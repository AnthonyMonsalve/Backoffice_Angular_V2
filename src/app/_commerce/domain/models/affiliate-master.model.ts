export class AffiliateMaster {
  AffiliateMasterSK: number;
  IdAffiliateMaster: string;
  Rif: string;
  RazonSocial: string;
  NombreComercial: string;
  Email: string;
  Phone: string;
  Created: string;
  Address: string;
  ChargeEnable: boolean;
  UpdateDate: string;
  Status: boolean;
  Origen: string;

  constructor(
    AffiliateMasterSK: number,
    IdAffiliateMaster: string,
    Rif: string,
    RazonSocial: string,
    NombreComercial: string,
    Email: string,
    Phone: string,
    Created: string,
    Address: string,
    ChargeEnable: boolean,
    UpdateDate: string,
    Status: boolean,
    Origen: string
  ) {
    this.AffiliateMasterSK = AffiliateMasterSK;
    this.IdAffiliateMaster = IdAffiliateMaster;
    this.Rif = Rif;
    this.RazonSocial = RazonSocial;
    this.NombreComercial = NombreComercial;
    this.Email = Email;
    this.Phone = Phone;
    this.Created = Created;
    this.Address = Address;
    this.ChargeEnable = ChargeEnable;
    this.UpdateDate = UpdateDate;
    this.Status = Status;
    this.Origen = Origen;
  }
}
