import { Component, OnInit } from '@angular/core';
import { AffiliateMasterList } from 'src/app/_commerce/application/interfaces/affiliate-master-list.interface';
import { MerchantService } from 'src/app/_commerce/application/services/data-merchant.service';
import { AffiliateMaster } from 'src/app/_commerce/domain/models/affiliate-master.model';

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
      .getListAffiliatesMaster(this.page, this.limit)
      .subscribe((data: AffiliateMasterList) => {
        this.commerces = data.data;
        this.total = data.metadata.total;
        this.page = data.metadata.page;
        this.lastPage = data.metadata.lastPage;
      });
  }
}
