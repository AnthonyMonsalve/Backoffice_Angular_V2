import { Component, OnInit } from '@angular/core';
import { AffiliateList } from '@core/interfaces/affiliate-list.interface';
import { Affiliate } from '@core/models/affiliate.model';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';

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
  searchTerm: string = '';
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  sort: string = 'name';

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.fetchCommerces();
  }

  fetchCommerces(): void {
    this.merchantService
      .getListAffiliates(
        this.page,
        this.limit,
        this.sort,
        this.order,
        this.searchTerm
      )
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

  onLimitChange(newLimit: number): void {
    this.limit = newLimit;
    this.page = 1; // Reset to first page
    this.fetchCommerces();
  }

  receiveSortOrder(sortOrder: any): void {
    this.sort = sortOrder.sort;
    this.order = sortOrder.order;
    console.log(sortOrder);
    this.fetchCommerces();
  }

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.page = 1; // Reset to first page
    this.fetchCommerces();
  }
}
