import { Component, OnInit } from '@angular/core';
import { AffiliateList } from 'src/app/_commerce/application/interfaces/affiliate-list.interface';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';
import { Affiliate } from 'src/app/_commerce/domain/models/affiliate.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './page-affiliate-list.component.html',
})
export class PageAffiliateListComponent implements OnInit {
  affiliates: Affiliate[] = [];
  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Listado de afiliados', active: true },
  ];
  order: string = 'ASC';
  page: number = 1;
  limit: number = 10;
  total: number = 0;

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
      });
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.fetchCommerces();
  }
}
