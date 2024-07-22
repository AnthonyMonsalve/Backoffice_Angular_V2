export class Affiliate {
  affiliatesSK: number;
  idAffiliate: string;
  name: string;
  chargeEnable: boolean;
  created: string;
  idMerchant: string;
  diasDiferido: number;
  idAffiliateMaster: string;
  nameAffiliateMaster: string;
  idBank: number;
  affiliateMasterSK: number;
  origen: string;
  updateDate: string;

  constructor(
    affiliatesSK: number,
    idAffiliate: string,
    name: string,
    chargeEnable: boolean,
    created: string,
    idMerchant: string,
    diasDiferido: number,
    idAffiliateMaster: string,
    nameAffiliateMaster: string,
    idBank: number,
    affiliateMasterSK: number,
    origen: string,
    updateDate: string
  ) {
    this.affiliatesSK = affiliatesSK;
    this.idAffiliate = idAffiliate.toLowerCase();
    this.name = name.toLowerCase();
    this.chargeEnable = chargeEnable;
    this.created = created.toLowerCase();
    this.idMerchant = idMerchant.toLowerCase();
    this.diasDiferido = diasDiferido;
    this.idAffiliateMaster = idAffiliateMaster.toLowerCase();
    this.nameAffiliateMaster = nameAffiliateMaster.toLowerCase();
    this.idBank = idBank;
    this.affiliateMasterSK = affiliateMasterSK;
    this.origen = origen.toLowerCase();
    this.updateDate = updateDate.toLowerCase();
  }
}
