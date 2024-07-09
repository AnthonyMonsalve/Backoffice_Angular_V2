import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AffiliateList } from '@commerce/application/interfaces/affiliate-list.interface';
import { AffiliateMaster } from '@commerce/domain/models/affiliate-master.model';
import { AffiliateMasterService } from '@services/affiliate-master.service';
import { AffiliateService } from '@services/affiliate.service';
import { Affiliate } from 'src/app/_commerce/domain/models/affiliate.model';

@Component({
  selector: 'app-affiliate-master-detail',
  templateUrl: './commerce-detail.component.html',
})
export class AffiliateMasterDetailComponent implements OnInit {
  affiliates: Affiliate[] = [];
  affiliateMaster: AffiliateMaster | null = null;

  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Listado de afiliados', active: true },
  ];
  order: string = 'ASC';
  page: number = 1;
  limit: number = 5;
  total: number = 0;
  affiliateMasterSk = this.route.snapshot.paramMap.get('sk');

  constructor(
    private route: ActivatedRoute,
    private affiliateService: AffiliateService,
    private affiliateMasterService: AffiliateMasterService
  ) {}

  ngOnInit(): void {
    this.fetchAffiliates();
    this.fetchAfflMaster();
  }

  fetchAfflMaster(): void {
    this.affiliateMasterService
      .getAffiliateMaster(this.affiliateMasterSk)
      .subscribe((data: AffiliateMaster) => {
        this.affiliateMaster = data;
      });
  }

  fetchAffiliates(): void {
    this.affiliateService
      .getAffiliatesByAfflMaster(this.affiliateMasterSk, this.page, this.limit)
      .subscribe((data: AffiliateList) => {
        this.affiliates = data.data;
        this.total = data.metadata.total;
        this.page = data.metadata.page;
      });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchAffiliates();
  }
}
