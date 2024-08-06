import { Component, OnInit } from '@angular/core';
import { AffiliateMaster } from '@core/models/affiliate-master.model';
import { AffiliateMasterService } from '@services/affiliate-master.service';
import { AffiliateMasterList } from 'src/app/_commerce/application/interfaces/affiliate-master-list.interface';

@Component({
  selector: 'app-user-list',
  templateUrl: './commerce-list.component.html',
})
export class CommerceListWebComponent implements OnInit {
  commerces: AffiliateMaster[] = [];
  breadCrumbItems: Array<{}> = [
    { label: 'Insta Web' },
    { label: 'Listado de comercios', active: true },
  ];
  order: string = 'ASC';
  searchTerm: string = '';
  sort: string = 'nombreComercial';
  page: number = 1;
  limit: number = 10;
  total: number = 0;
  lastPage: number = 1;

  constructor(private affiliateMasterService: AffiliateMasterService) {}

  ngOnInit(): void {
    this.fetchCommerces();
  }

  fetchCommerces(): void {
    this.affiliateMasterService
      .getListAffiliatesMaster({
        page: this.page,
        limit: this.limit,
        sort: this.sort,
        order: this.order,
        where: this.searchTerm,
        search: 'Instapago',
      })
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

  onSearchChange(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.page = 1; // Reset to first page
    this.fetchCommerces();
  }
}
