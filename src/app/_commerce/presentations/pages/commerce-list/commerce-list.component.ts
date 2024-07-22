import { Component, OnInit } from '@angular/core';
import { AffiliateMasterList } from 'src/app/_commerce/application/interfaces/affiliate-master-list.interface';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';
import { AffiliateMaster } from '@core/models/affiliate-master.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './commerce-list.component.html',
})
export class CommerceListComponent implements OnInit {
  commerces: AffiliateMaster[] = [];
  breadCrumbItems: Array<{}> = [
    { label: 'Insta Comercio' },
    { label: 'Listado de comercios', active: true },
  ];
  order: string = 'ASC';
  sort: string = 'nombreComercial';
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  lastPage: number = 1;

  constructor(private merchantService: MerchantService) {}

  ngOnInit(): void {
    this.fetchCommerces();
  }

  fetchCommerces(): void {
    this.merchantService
      .getListAffiliatesMaster(this.page, this.limit, this.sort, this.order)
      .subscribe((data: AffiliateMasterList) => {
        this.commerces = data.data;
        this.total = data.metadata.total;
        this.page = data.metadata.page;
        this.lastPage = data.metadata.lastPage;
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

  changeSort(column: string): void {
    if (this.sort === column) {
      this.order = this.order === 'ASC' ? 'DESC' : 'ASC';
    } else {
      this.sort = column;
      this.order = 'ASC';
    }
    this.fetchCommerces();
  }
}
