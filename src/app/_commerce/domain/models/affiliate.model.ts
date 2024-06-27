export class Affiliate {
  AffiliatesSK: number;
  idAffiliate: string;
  Name: string;
  ChargeEnable: boolean;
  Created: string;
  IdMerchant: string;
  DiasDiferido: number;
  IdAffiliateMaster: string;
  IdBank: number;
  AffiliateMasterSK: number;
  Origen: string;
  UpdateDate: string;

  constructor(
    AffiliatesSK: number,
    idAffiliate: string,
    Name: string,
    ChargeEnable: boolean,
    Created: string,
    IdMerchant: string,
    DiasDiferido: number,
    IdAffiliateMaster: string,
    IdBank: number,
    AffiliateMasterSK: number,
    Origen: string,
    UpdateDate: string
  ) {
    this.AffiliatesSK = AffiliatesSK;
    this.idAffiliate = idAffiliate;
    this.Name = Name;
    this.ChargeEnable = ChargeEnable;
    this.Created = Created;
    this.IdMerchant = IdMerchant;
    this.DiasDiferido = DiasDiferido;
    this.IdAffiliateMaster = IdAffiliateMaster;
    this.IdBank = IdBank;
    this.AffiliateMasterSK = AffiliateMasterSK;
    this.Origen = Origen;
    this.UpdateDate = UpdateDate;
  }
}
