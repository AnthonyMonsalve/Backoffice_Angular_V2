import { Component, OnInit } from '@angular/core';
import { AffiliateList } from 'src/app/_commerce/application/interfaces/affiliate-list.interface';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';
import { Affiliate } from 'src/app/_commerce/domain/models/affiliate.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './affiliate-list.component.html',
})
export class AffiliateListComponent implements OnInit {
  affiliates: Affiliate[] = [];
  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Listado de afiliados', active: true },
  ];
  order: string = 'ASC';
  page: number = 1;
  limit: number = 20;
  total: number = 0;
  lastPage: number = 1;

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.fetchCommerces();
  }

  fetchCommerces(): void {
    this.merchantService
      .getListAffiliates(this.page, this.limit)
      .subscribe((data: AffiliateList) => {
        this.affiliates = data.data;
        this.total = data.metadata.total;
        this.page = data.metadata.page;
        this.lastPage = data.metadata.lastPage;
      });
  }
}
